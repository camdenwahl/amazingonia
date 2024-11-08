import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import GoldenHeader from '../components/GoldenHeader';
import { useNavigate } from 'react-router-dom';

function GoldenCartPage() {
    const { cart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <>
            <GoldenHeader onSearch={() => {}} />
            <div
                className="p-6 max-w-screen-xl mx-auto bg-[#f7f7f7] rounded-lg shadow-md"
                style={{
                    marginTop: '1.618rem',
                }}
            >
                <h1
                    className="font-bold mb-4"
                    style={{
                        fontSize: '2.618rem',
                        marginBottom: '1.618rem',
                    }}
                >
                    Your Cart
                </h1>
                {cart.length === 0 ? (
                    <p style={{ fontSize: '1.125rem' }}>Your cart is empty.</p>
                ) : (
                    <div
                        className="grid gap-6"
                        style={{
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        }}
                    >
                        {cart.map((item, index) => (
                            <div
                                key={item.Absolute_Url || index}
                                className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-white"
                                style={{
                                    padding: '1.618rem',
                                }}
                            >
                                <img
                                    className="w-full h-auto object-contain mb-4"
                                    src={item.Image_Url || './placeholder.png'}
                                    alt={item.ProductName}
                                    style={{ maxHeight: '200px' }}
                                />
                                <div className="text-center">
                                    <p
                                        className="font-semibold mb-2"
                                        style={{ fontSize: '1.125rem' }}
                                    >
                                        {item.ProductName}
                                    </p>
                                    <p
                                        className="text-gray-500 mb-2"
                                        style={{ fontSize: '1rem' }}
                                    >
                                        Brand: {item.Brand}
                                    </p>
                                    <p className="product-price mb-2">
                                        {item.DiscountPrice ? (
                                            <>
                                                <span
                                                    className="price text-red-600"
                                                    style={{ fontSize: '1.125rem' }}
                                                >
                                                    ${item.DiscountPrice}
                                                </span>
                                                <span className="discount-price line-through ml-2 text-gray-500">
                                                    ${item.Price}
                                                </span>
                                            </>
                                        ) : (
                                            <span
                                                className="price text-red-600"
                                                style={{ fontSize: '1.125rem' }}
                                            >
                                                ${item.Price}
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <button
                                    className="mt-2 text-red-500 hover:text-red-700"
                                    style={{
                                        padding: '0.618rem 1rem',
                                        fontSize: '1rem',
                                    }}
                                    onClick={() => removeFromCart(item.Absolute_Url)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    onClick={() => navigate('/golden')}
                    className="mt-6 bg-[#307351] text-white rounded hover:bg-[#2a6244] transition"
                    style={{
                        padding: '0.618rem 1rem',
                        fontSize: '1rem',
                    }}
                >
                    Return to Homepage
                </button>
            </div>
        </>
    );
}

export default GoldenCartPage;
