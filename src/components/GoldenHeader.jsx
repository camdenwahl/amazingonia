import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import Searchbar from './Searchbar';

function GoldenHeader({ onSearch }) {
    const { cart } = useContext(CartContext);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > lastScrollTop) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    return (
        <div
            className={`flex flex-wrap bg-[#307351] text-white justify-between items-center font-extrabold transition-transform duration-300 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
            style={{
                padding: '1.618rem',
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
            }}
        >
            <Link
                to="/golden"
                className="flex-shrink-0"
                style={{
                    fontSize: '2.618rem', 
                    margin: '0 1rem',
                }}
            >
                ShopSearch
            </Link>
            <h2
                className="flex-grow text-center"
                style={{
                    fontSize: '1.618rem', 
                    margin: '0 1rem',
                }}
            >
                Deliver to You
            </h2>
            <div className="flex-grow" style={{ margin: '0 1rem' }}>
                <Searchbar onSearch={onSearch} />
            </div>
            <ul className="flex space-x-4 ml-4">
                <li style={{ fontSize: '1.125rem', margin: '0.5rem' }}>English</li>
                <Link to="/first-prompt" style={{ fontSize: '1.125rem', margin: '0.5rem' }}>Restart</Link>
                <li style={{ fontSize: '1.125rem', margin: '0.5rem' }}>Returns</li>
                <li className="relative" style={{ fontSize: '1.125rem', margin: '0.5rem' }}>
                    <Link to="/golden-cart">Cart</Link>
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs px-2">
                            {cart.length}
                        </span>
                    )}
                </li>
            </ul>
        </div>
    );
}

export default GoldenHeader;
