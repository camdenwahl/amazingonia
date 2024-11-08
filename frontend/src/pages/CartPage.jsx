// src/pages/CartPage.js
import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const { cart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <>
            <Header onSearch={() => {}} /> 
            <div className="p-4 max-w-screen-xl mx-auto mt-40">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {cart.map((item, index) => (
                            <div key={item.Absolute_Url || index} className="border p-4 rounded shadow product-card flex flex-col items-center">
                                <img className="product-image mb-2" src={item.Image_Url || './placeholder.png'} alt={item.ProductName} />
                                <div className="product-info w-full">
                                    <p className="product-title">{item.ProductName}</p>
                                    <p className="product-brand">Brand: {item.Brand}</p>
                                    <p className="product-price">
                                        {item.DiscountPrice ? (
                                            <>
                                                <span className="price font-bold text-red-600">${item.DiscountPrice}</span>
                                                <span className="discount-price line-through ml-2 text-gray-500">${item.Price}</span>
                                            </>
                                        ) : (
                                            <span className="price font-bold text-red-600">${item.Price}</span>
                                        )}
                                    </p>
                                    <button
                                        className="text-red-500 hover:text-red-700 mt-2"
                                        onClick={() => removeFromCart(item.Absolute_Url)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={() => navigate('/')}
                    className="mt-4 bg-[#307351] text-white px-4 py-2 rounded hover:bg-[#2a6244] transition"
                >
                    Return to Homepage
                </button>
            </div>
        </>
    );
}

export default CartPage;
