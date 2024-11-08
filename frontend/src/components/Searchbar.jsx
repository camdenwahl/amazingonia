import React, { useState } from 'react';

function Searchbar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="search-bar-container flex w-full md:w-1/2 items-center">
            <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={handleInputChange}
                className="flex-1 rounded text-black p-2 w-full border border-gray-300"
            />
            <button onClick={() => onSearch(query)} className="bg-[#a9176f] text-white rounded p-2 ml-2 text-sm md:text-base">
                Search
            </button>
        </div>
    );
}

export default Searchbar;
