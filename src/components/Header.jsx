import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import Searchbar from './Searchbar';

function Header({ onSearch }) {
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
            className={`flex bg-[#307351] text-white p-5 justify-between items-center font-extrabold transition-transform duration-300 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
            style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}
        >
            <Link to="/" className="sm:text-2xl md:text-3xl m-2">ShopSearch</Link>
            <h2 className="m-2 hidden md:block">Deliver to You</h2>
            <div className="flex-grow mx-4">
                <Searchbar onSearch={onSearch} />
            </div>
            <ul className="flex items-center space-x-4">
                <li className="hidden md:block">English</li>
                <li className="hidden md:block">Sign in</li>
                <Link to="/first-prompt" className="hidden md:block">Restart</Link>
                <li className="relative">
                    <Link to="/cart" className="flex items-center">
                        <span className="mr-1">Cart</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1.5 py-0.5">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Header;
