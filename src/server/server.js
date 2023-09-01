
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const envConfig = require('dotenv')
const axios = require('axios')
const cors = require('cors')

envConfig.config()

const app = express();
app.use(bodyParser.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        optionsSuccessStatus: 204,
        credentials: true,
        allowedHeaders: 'X-Shopify-Access-Token'
    }
))

const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const SECRET_KEY = process.env.SHOPIFY_SECRET_KEY;
const ADMIN_API = process.env.SHOPIFY_ADMIN_API;
const DEV_URL = process.env.DEV_URL;
const apiUrl = `${DEV_URL}/admin/api/2023-07`;

const port = 8000;

app.get("/products", async (req, res) => {
    res.header('Allow-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Allow-Control-Allow-Credentials', 'true');

    try {
        await axios.get(`${apiUrl}/products.json`, {
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": `${ADMIN_API}`
            }
        }).then(products => {
            res.status(200).json({
                "data": products.data.products
            })
        }).catch(err => {
            res.status(500).json({
                error: 'failed to fetch data'
            })
            console.log(err)
        })


    } catch (error) {
        console.log(error)
    }
})

app.get("/products/:id", async (req, res) => {
    res.header('Allow-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Allow-Control-Allow-Credentials', 'true');
    // https://demo-shopping-app.myshopify.com/admin/api/2023-07/products/8594038194467.json
    const id = req.params.id
    console.log(id)
    try {
        axios.get(`${apiUrl}/products/${id}.json`, {
            headers: {
                "Content-Type": "application/json",
                'X-Shopify-Access-Token': `${ADMIN_API}`
            }
        }).then(product => {
            //console.log(product.data);
            res.status(200).json(product.data)
        }).catch(err => {
            console.log(err)
        })
    } catch (error) {
        console.log(error)
    }

})

app.listen(port, () => {
    console.log(`Server is listening on: ${port}`)
})
