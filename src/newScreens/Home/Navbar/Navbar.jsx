import React from 'react'

import avatar from '../../../assets/icons/icons8-avatar-100.png'

import {Avatar} from '@mui/material'
import { GiCharacter } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import { BsBag } from "react-icons/bs";
import Badge from '@mui/material/Badge';

import './Navbar.css'
const Navbar = () => {
  return (
    <div className='newNavbar'>
        <div>farm2bag</div>
        <div className='newSearchbox'>
        <input type="text" name="search" id="search" placeholder='Search'/>
        <button>Go</button>
        </div>
        <div className='newNavbarRight'>
            <div className='newNavbarRight1'>
            <Avatar alt='img' sx={{ width: 56, height: 56 }}><GiCharacter size={25}/></Avatar>
            <div className='newNavbarRight2'>
                <div className='newNavbarRight3'>
                    <button>Account</button>
                    <div className='newNavbarRight4'><button>Register</button> | <button>Login</button></div>
                </div>
            </div>
            </div>
            <button><Badge color="primary" badgeContent={99}><FaRegHeart size={30} /></Badge></button>
            <button><Badge color="primary" badgeContent={99}><BsBag size={30} /></Badge></button>
        </div>
    </div>
  )
}

export default Navbar