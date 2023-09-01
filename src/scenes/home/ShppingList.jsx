import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { setItems } from "../../state";
import Item from "../../components/item";
import axios from "axios";
import { API_URL } from "../../components/config/settings";

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const items = useSelector((state) => state.cart.items);
    const breakPoint = useMediaQuery("(min-width:600px)");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const appUrl = API_URL()

    const getProducts = async () => {
        axios.get(`${appUrl}/products`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }).then(res => {
            dispatch(setItems(res.data.data))
            console.log(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }


    useEffect(() => {
        getProducts();

    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    const topRatedItems = items.filter(
        (item) => item.cid === 4
    );


    return (
        <Box width="80%" margin="80px auto">
            <Typography variant="h3" textAlign="center">
                Our Featured <b>Products</b>
            </Typography>
            <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
                sx={{
                    m: "25px",
                    "& .MuiTabs-flexContainer": {
                        flexWrap: "wrap"
                    },
                }}
            >
                <Tab label="ALL" value="all" />
                <Tab label="Top Rated" value="4" />
                <Tab label="New Arrivals" value="newArrivals" />
                <Tab label="Best Sellers" value="bestSellers" />

            </Tabs>
            <Box
                margin="0 auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 300px)"
                justifyContent="space-between"
                rowGap="20px"
                columnGap="1.33%"
            >
                {value === "all" && items ? items.map((item) => (
                    <Item item={item} key={item.id} />
                )) : ''}
            </Box>
        </Box>
    )

}

export default ShoppingList;