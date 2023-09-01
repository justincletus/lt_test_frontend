import { API_URL } from "../components/config/settings";

const appURL = API_URL();

export const getProducts = async () => {
    try {
        const items = await fetch(`${appURL}/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        const itemsJson = await items.json();
        if (items.status === 200) {
            console.log(itemsJson);
            return itemsJson;
        }

        //console.log(itemsJson.data);
    } catch (error) {
        return error
    }

}
