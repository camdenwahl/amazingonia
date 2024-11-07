import Searchbar from "./Searchbar";
import React from 'react';


function Header({onSearch}) {
    return (
        <>
        <div className = "flex bg-[#307351] text-white p-5 justify-around font-extrabold">
            <h1 className ="m-2 text-3xl">Amazingonia</h1>
            <h2 className ="m-2">Deliver to You</h2>
            <Searchbar onSearch={onSearch}/>
            <ul className = "flex">
                <li className ="m-2">English</li>
                <li className ="m-2">Sign in</li>
                <li className ="m-2">Returns</li>
                <li className ="m-2">Cart</li>
            </ul>
        </div>
        </>
    )
}


export default Header;