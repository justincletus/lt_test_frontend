import styled from "@emotion/styled";
import { Box, IconButton, Typography, Button, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    decreaseCount,
    increaseCount,
    removeFromCart,
    setIsCartOpen,
} from "../../state";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const totalPrice = cart.reduce((total, item) => {
        console.log(item);
        return total + item.count * item.variants[0].price;
    }, 0);

    return (
        <Box
            display={isCartOpen ? "block" : "none"}
            backgroundColor="rgba(0,0,0, 0.4)"
            position="fixed"
            zIndex={10}
            width="100%"
            height="100%"
            left="0"
            top="0"
            overflow="auto"
        >
            <Box
                position="fixed"
                right="0"
                bottom="0"
                width="max(400px, 30%)"
                height="100%"
                backgroundColor="white"
            >
                <Box padding="30px" overflow="auto" height="100%">
                    <FlexBox mb="15px">
                        <Typography variant="h3"> Shopping Bag({cart.length})</Typography>
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                            <CloseIcon />
                        </IconButton>
                    </FlexBox>
                    <Box>
                        {cart.map((item) => (
                            <Box key={item.id}>
                                <FlexBox p="15px 0">
                                    <Box flex="1 1 40%">
                                        <img
                                            alt="{item?.name}"
                                            width="80px"
                                            height="100px"
                                            src={item.image.src}
                                        />
                                    </Box>
                                    <Box flex="1 1 60%">
                                        <FlexBox mb="5px">
                                            <Typography fontWeight="bold">
                                                {item.title}
                                            </Typography>
                                            <IconButton
                                                onClick={() => dispatch(removeFromCart({ id: item.id }))}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </FlexBox>
                                        <Typography>{item.shot_description}</Typography>
                                        <FlexBox m="15px 0">
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                border={`1.5px solid ${shades.neutral[500]}`}
                                            >
                                                <IconButton
                                                    onClick={() => dispatch(decreaseCount({ id: item.id }))}
                                                >
                                                    <RemoveIcon />

                                                </IconButton>
                                                <Typography>{item.count}
                                                </Typography>
                                                <IconButton
                                                    onClick={() => dispatch(increaseCount({ id: item.id }))}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                            <Typography fontWeight="bold"> ${item.variants[0].price}</Typography>

                                        </FlexBox>
                                    </Box>
                                </FlexBox>
                                <Divider />
                            </Box>

                        ))}

                    </Box>
                    <Box m="20px 0">
                        <FlexBox m="20px 0">
                            <Typography fontWeight="bold">SubTotal</Typography>
                            <Typography fontWeight="bold">Rs {totalPrice}</Typography>
                        </FlexBox>
                        <Button
                            sx={{
                                backgroundColor: shades.primary[400],
                                color: "white",
                                borderRadius: 0,
                                minWidth: "100%",
                                padding: "20px 40px",
                                m: "20px 0"
                            }}
                            onClick={() => {
                                navigate("/checkout");
                                dispatch(setIsCartOpen({}))
                            }}
                        >
                            Checkout
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CartMenu;
