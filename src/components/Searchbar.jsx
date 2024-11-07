// src/components/SearchBar.js
import React, { useState } from 'react';

function Searchbar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Trigger search in HomePage
  };

  return (
    <div className = "search-bar m-2 rounded w-1/2">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleInputChange}
        className = "rounded text-black p-2 w-5/6"/>
            <button onClick={() => onSearch(query)} className = "bg-[#a9176f] rounded p-2">Search</button> 
    </div>
  );
}

export default Searchbar;
