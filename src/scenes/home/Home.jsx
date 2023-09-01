import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingList from "./ShppingList";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from '../../assets/chris-ghinda.jpeg'

const Home = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");


  return (
    <div className="home">
      <div className="container" style={{ textAlign: 'center' }}>
        <img src={logo} alt="home-page-mg" style={{ height: 800 }} />
      </div>
      <ShoppingList />

    </div>
  )
}

export default Home;
