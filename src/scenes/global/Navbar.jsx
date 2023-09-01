import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../state";
import { Badge, Box, IconButton } from "@mui/material";
import { MenuOutlined, LoginOutlined, SearchOutlined, ShoppingBagOutlined, PersonAddAltOutlined, LogoutOutlined } from "@mui/icons-material";
import { Tooltip } from '@material-ui/core';
import { shades } from "../../theme";
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../components/config/settings'

function Navbar({ username }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const [open, setOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const appUrl = API_URL();
    const [refresh_token, setRefreshToken] = useState('');

    return (
        <Box
            display="flex"
            alignItems="center"
            width="100%"
            height="60px"
            backgroundColor="rgba(255,255,255, 0.95)"
            color="black"
            position="fixed"
            top="0"
            lafet="0"
            zIndex="1"
        >
            <Box
                width="80%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box
                    onClick={() => navigate("/")}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    color={shades.secondary[900]}
                >
                    Demo Shopong App
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    columnGap="20px"
                    zIndex="2"
                >
                    <IconButton sx={{ color: "black" }}>
                        <SearchOutlined />
                    </IconButton>
                    {
                        username ? (
                            <>
                                <NavLink onClick={logoutHandler}>
                                    <Tooltip title="Logout">
                                        <IconButton>
                                            <LogoutOutlined></LogoutOutlined>
                                        </IconButton>
                                    </Tooltip>
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to='/register' className="active-link">
                                    <Tooltip title="Register">
                                        <IconButton sx={{ color: "black" }}>
                                            <PersonAddAltOutlined />
                                        </IconButton>
                                    </Tooltip>
                                </NavLink>
                                <NavLink to="/login" className="active-link">
                                    <Tooltip title="Login">
                                        <IconButton sx={{ color: "black" }}>
                                            <LoginOutlined />
                                        </IconButton>
                                    </Tooltip>
                                </NavLink>
                            </>
                        )
                    }

                    <Badge
                        badgeContent={cart.length}
                        color="secondary"
                        invisible={cart.length === 0}
                        sx={{
                            "& .MuiBadge-badge": {
                                right: 5,
                                top: 5,
                                padding: "0 4px",
                                height: "14px",
                                minWidth: "13px"
                            }
                        }}
                    >
                        <IconButton
                            onClick={() => dispatch(setIsCartOpen({}))}
                            sx={{ color: "black" }}
                        >
                            <ShoppingBagOutlined />
                        </IconButton>
                    </Badge>
                    <IconButton sx={{ color: "black" }}>
                        <MenuOutlined />
                    </IconButton>
                </Box>
            </Box>
        </Box>

    )

}

export default Navbar;