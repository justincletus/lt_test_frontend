import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { shades } from '../theme';
import { addToCart } from "../state";

const Item = ({ item, width }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const {
        palette: { neutral },
    } = useTheme();

    //console.log(item);

    const { category, price, title, image, variants } = item
    //console.log(name);

    return (
        <Box width={width}>
            <Box
                position="relative"
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            >
                <img
                    alt="item.title"
                    width="300px"
                    height="400px"
                    src={image.src}
                    onClick={() => navigate(`/item/${item.id}`)}
                    style={{ cursor: "pointer" }}
                />
                <Box
                    display={isHovered ? "block" : "none"}
                    position="absolute"
                    bottom="10%"
                    left="0"
                    width="100%"
                    padding="0 5%"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            backgroundColor={shades.neutral[100]}
                            borderRadius="3px"
                        >
                            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                                <RemoveIcon />
                            </IconButton>
                            <Typography color={shades.primary[300]}>{count}</Typography>
                            <IconButton onClick={() => setCount(count + 1)}>
                                <AddIcon />

                            </IconButton>
                        </Box>
                        <Button onClick={() => {
                            dispatch(addToCart({
                                item: { ...item, count }
                            }));
                        }}
                            sx={{ backgroundColor: shades.primary[300], color: "white" }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box mt="3px">
                <Typography variant="subtitle" color={neutral.dark}>

                </Typography>
                <Typography>{title} </Typography>
                <Typography fontWeight="bold">Rs {variants[0].price}</Typography>

            </Box>
        </Box>
    )
}

export default Item;
