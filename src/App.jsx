import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './scenes/home/Home';
import Navbar from './scenes/global/Navbar';
import React, { useEffect, useState } from 'react';
import CartMenu from './scenes/global/CartMenu';
import ItemDetails from './itemDetails/ItemDetails';
import Checkout from './scenes/checkout/Checkout';
import { API_URL } from './components/config/settings';
import axios from 'axios';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])
}
function App() {
  const [username, setUsername] = useState('');
  const appUrl = API_URL();

  useEffect(() => {

  }, [])


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar username={username} />
        <ScrollToTop />

        <Routes>
          <Route path="/" exact element={<Home username={username} />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />

        </Routes>
        <CartMenu />
      </BrowserRouter>

    </div>
  );
}

export default App;
