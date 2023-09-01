import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { API_URL } from '../components/config/settings'
import { getProducts } from "../api/api";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import { FavoriteBorderOutlinedIcon } from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import axios from "axios";

const ItemDetails = () => {
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const [value, setValue] = useState("description");
    const [count, setCount] = useState(1);
    const [item, setItem] = useState();
    const [items, setItems] = useState([])

    const appURL = API_URL();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }


    const getItem = async () => {
        console.log(itemId)
        axios.get(`${appURL}/products/${itemId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            setItem(res.data.product)
            console.log(res.data.product)
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getItem();

    }, []) //eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Box width="80%" m="80px auto">
            <Box display="flex" flexWrap="wrap" columnGap="40px">
                <Box flex="1 1 40%" mb="40px">
                    <img
                        alt={item.title}
                        width="100%"
                        height="100%"
                        src={item.image.src}
                        style={{ objectFit: "contain" }}

                    />

                </Box>
                <Box flex="1 1 50%" mb="40px">
                    <Box display="flex" justifyContent="space-between">
                        <Box> Home/Item</Box>
                        <Box>Prev Next </Box>
                    </Box>
                    <Box m="65px 0 25px 0">
                        <Typography variant="h3">{item?.title}</Typography>
                        <Typography>Rs {item.variants[0].price}</Typography>
                        <Typography sx={{ mt: "20px" }}>{item?.description}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" minHeight="50px">
                        <Box
                            display="flex"
                            alignItems="center"
                            border={`1.5px solid ${shades.neutral[300]}`}
                            mr="20px"
                            p="2px 5px"
                        >
                            <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                            <IconButton onClick={() => setCount(count + 1)}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                        <Button
                            sx={{
                                backgroundColor: "#222222",
                                color: "white",
                                borderRadius: 0,
                                minWidth: "150px",
                                padding: "10px 40px"
                            }}
                            onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                    <Box>
                        <Box m="20px 0 5px 0" display="flex">
                            {/* <FavoriteBorderOutlinedIcon /> */}
                            <Typography>Add to WishList</Typography>
                        </Box>
                        <Typography>Category: </Typography>
                    </Box>
                </Box>
            </Box>
            <Box>

            </Box>
        </Box>
    )
}

export default ItemDetails;