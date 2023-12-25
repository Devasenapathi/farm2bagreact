import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import './navbar.css'

const Navbar = ({ location, handleOpen }) => {
    return (
        <div className="navbar_main">
            <div className='navbar_logo'>
                <h4>Farm2bag</h4>
            </div>
            <div>
                <input type='text' className='navbar_text' name="search" placeholder='Search'></input>
            </div>
            <h3 onClick={handleOpen}>{location}</h3>
            <div className='navbar_left'>
                <FaShoppingCart size={30} />
                <MdAccountCircle size={30} />
            </div>
        </div>
    )
}

export default Navbar
