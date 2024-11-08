// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Exporting CartContext so it can be imported in other components
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (productUrl) => {
        setCart((prevCart) => prevCart.filter((item) => item.Absolute_Url !== productUrl));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Optional: Create a custom hook for convenience (uses existing functions)
export const useCart = () => useContext(CartContext);
