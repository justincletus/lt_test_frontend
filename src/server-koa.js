import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";

dotenv.config();
const port = 8000;
const handle = app.getRequestHandler();

Shopify.Context.initialize({
    API_KEY: import.meta.env.VITE_API_SHOPIFY_CLIENT_ID,
    API_SECRET_KEY: import.meta.env.VITE_API_SHOPIFY_SECRET_KEY,
    SCOPES: import.meta.env.VITE_API_SHOPIFY_SCOPES.split(","),
    HOST_NAME: import.meta.env.VITE_API_DEV_URL.replace(/https:\/\//, ""),
    API_VERSION: "2023-07",
    IS_EMBEDDED_APP: true,
    // This should be replaced with your preferred storage strategy
    SESSION_STORAGE: new Shopify.Session.MemorySessionStorage()
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};
app.prepare().then(async () => {
    const server = new Koa();
    const router = new Router();
    server.keys = [Shopify.Context.API_SECRET_KEY];

    server.use(
        createShopifyAuth({
            async afterAuth(ctx) {
                // Access token and shop available in ctx.state.shopify
                const { shop, accessToken, scope } = ctx.state.shopify;
                const host = ctx.query.host;
                ACTIVE_SHOPIFY_SHOPS[shop] = scope;

                const response = await Shopify.Webhooks.Registry.register({
                    shop,
                    accessToken,
                    path: "/webhooks",
                    topic: "APP_UNINSTALLED",
                    webhookHandler: async (topic, shop, body) =>
                        delete ACTIVE_SHOPIFY_SHOPS[shop]
                });

                if (!response.success) {
                    console.log(
                        `Failed to register APP_UNINSTALLED webhook: ${response.result}`
                    );
                }

                // Redirect to app with shop parameter upon auth
                ctx.redirect(`/?shop=${shop}&host=${host}`);
            }
        })
    );

    const handleRequest = async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    };

    router.post("/webhooks", async (ctx) => {
        try {
            await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
            console.log(`Webhook processed, returned status code 200`);
        } catch (error) {
            console.log(`Failed to process webhook: ${error}`);
        }
    });

    router.post(
        "/graphql",
        verifyRequest({
            returnHeader: true
        }),
        async (ctx, next) => {
            await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
        }
    );

    router.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });

    router.get("/products", async (ctx) => {
        const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res);
        // Create a new client for the specified shop.
        const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
        // Use `client.get` to request the specified Shopify REST API endpoint, in this case `products`.
        const products = await client.get({
            path: "products"
        });

        ctx.body = products;
        ctx.status = 200;
    });

    router.get("/assets", async (ctx) => {
        const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res);
        // Create a new client for the specified shop.
        const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
        // Use `client.get` to request the specified Shopify REST API endpoint, in this case `products`.
        const data = await client.get({
            path: "assets"
        });

        ctx.body = data;
        ctx.status = 200;
    });

    router.get("(/_next/static/.*)", handleRequest); // Static content is clear
    router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear

    router.get("(.*)", async (ctx) => {
        const shop = ctx.query.shop;

        // This shop hasn't been seen yet, go through OAuth to create a session
        if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
            ctx.redirect(`/auth?shop=${shop}`);
        } else {
            await handleRequest(ctx);
        }
    });

    server.use(router.allowedMethods());
    server.use(router.routes());
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
