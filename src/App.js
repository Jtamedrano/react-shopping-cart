import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import CartContext from './contexts/CartContext';
import ProductContext from './contexts/ProductContext';

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const tempData = window.localStorage.getItem('cartData');
    if (tempData) {
      setCart(JSON.parse(tempData));
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem('cartData', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item) => {
    // add the given item to the cart
    setCart([...cart, item]);
  };
  const removeItem = (itemIndex) => {
    setCart(cart.filter((_, i) => i !== itemIndex));
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation />
          <Route path="/cart">
            <ShoppingCart />
          </Route>
        </CartContext.Provider>

        {/* Routes */}
        <Route exact path="/">
          <Products />
        </Route>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
