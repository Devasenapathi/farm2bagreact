import React, { useEffect, useState } from 'react'
// import Location from '../../../screens/landing/location';
import avatar from '../../../assets/icons/icons8-avatar-100.png'

import {Avatar} from '@mui/material'
import { GiCharacter } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import { BsBag } from "react-icons/bs";
import Badge from '@mui/material/Badge';
import { IoSearchSharp } from "react-icons/io5";

import './Navbar.css'
import { Logout, getCart, getLocationDetails, getToken, getUserDetails, setProductList } from '../../../utils/storage';
import { useNavigate } from 'react-router-dom';
import Login from '../../../screens/login/login';
import { farmItemService } from '../../../services/b2c_service';
import { AddCart, RemoveCart } from '../../../services/cart_service';

const Navbar = () => {
  // const [locationVisible, setLocationVisible] = useState(false);
  // const [location, setLocation] = useState();
  const [cartLength, setCartLength] = useState(0)
  const navigate = useNavigate()
  const [loginVisible, setLoginVisible] = useState(false);
  const [locationChanged, setLocationChanged] = useState()
  const [open, setOpen] = useState(false)
  const [productName, setProductName] = useState()
  const [farmItem, setFarmItem] = useState()
  const [cartData, setCartData] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(()=>{
    setCartLength(getCart())
  },[])

  useEffect(()=>{
    const data = {
      lat: getLocationDetails() ? getLocationDetails().lattitude : "",
      lng: getLocationDetails() ? getLocationDetails().longitude : "",
      pincode: getLocationDetails() ? getLocationDetails().pincode : "",
    };
    farmItemService(data)
      .then((res) => {
        if (res.status === 200) {
          setProductList(res.data.result);
          setFarmItem(res.data.result)
          if (locationChanged === true) {
            setLocationChanged(false);
          } else {
            setLocationChanged(true);
          }
        } else {
          console.log("Error on getting farmItem");
        }
      })
      .catch((err) => {
        console.log(err, "error on seasnol product fetching");
      });
  },[])

  const Add = (data) => {
    const value = AddCart(data);
    if (value) {
      setCartData(getCart());
    }
  };
  const Remove = (data) => {
    const value = RemoveCart(data);
    if (value) {
      setCartData(getCart());
    }
  };
  
  const handleNavigate = () => {
    if (getToken()) {
      if (getCart().length > 0) {
        navigate('/checkout')
      } else {
        setOpen(true)
      }
    } else {
      setLoginVisible(true)
    }
  }
  const handleLogout = () => {
    Logout();
    navigate('/')
  };

  const handleRouting = (data) => {
    setProductName("")
    navigate(`/product/${data._id}`, { state: data });
  };

  return (
    <div className='newNavbar'>
      {loginVisible && <Login handleClose={() => setLoginVisible(false)} />}
        <div className='newNavbar1'>
    {!searchVisible&&<h2 onClick={()=>navigate('/')}>farm2bag</h2>}
    <div className='navbar_searchbox'>
    <div className='newSearchbox'>
        <input type="text" name="search" id="search" placeholder='Search' value={productName} onChange={(e)=>setProductName(e.target.value)}/>
        <button><IoSearchSharp /></button>
    </div>
    {productName && (
        <div className="search-panel">
            {farmItem&&farmItem
                .filter((item) =>
                    item.productName.toLowerCase().includes(productName.toLowerCase())
                )
                .map((val, index) => (
                    <div className="search-item" key={index}>
                        {val.image && (
                            <img src={val.image} alt="" className="search-item-image" />
                        )}
                        <div
                            className="search-details"
                            onClick={() => {
                                handleRouting(val);
                            }}
                        >
                            <h6 className="search-product-name">{val.productName}</h6>
                            <p className="search-product-price">
                                {val.unit} {val.unitValue} - ₹ {val.price}
                            </p>
                        </div>
                        <div className="cart-button">
                            {cartData.find((item) => item._id === val._id)?.quantity > 0 && (
                                <>
                                    <button onClick={() => Remove(val)}>-</button>
                                    <h5>{cartData.find((item) => item._id === val._id).quantity}</h5>
                                </>
                            )}
                            <button onClick={() => Add(val)}>+</button>
                        </div>
                    </div>
                ))}
        </div>
    )}
    </div>



    {searchVisible&&<div className="navbar_searchbox">
    <div className='newMobileSearchbox'>
        <input type="text" name="search" id="search" placeholder='Search' value={productName} onChange={(e)=>setProductName(e.target.value)}/>
        <button><IoSearchSharp /></button>
    </div>
    {productName && (
        <div className="search-panel">
            {farmItem&&farmItem
                .filter((item) =>
                    item.productName.toLowerCase().includes(productName.toLowerCase())
                )
                .map((val, index) => (
                    <div className="search-item" key={index}>
                        {val.image && (
                            <img src={val.image} alt="" className="search-item-image" />
                        )}
                        <div
                            className="search-details"
                            onClick={() => {
                                handleRouting(val);
                            }}
                        >
                            <h6 className="search-product-name">{val.productName}</h6>
                            <p className="search-product-price">
                                {val.unit} {val.unitValue} - ₹ {val.price}
                            </p>
                        </div>
                        <div className="cart-button">
                            {cartData.find((item) => item._id === val._id)?.quantity > 0 && (
                                <>
                                    <button onClick={() => Remove(val)}>-</button>
                                    <h5>{cartData.find((item) => item._id === val._id).quantity}</h5>
                                </>
                            )}
                            <button onClick={() => Add(val)}>+</button>
                        </div>
                    </div>
                ))}
        </div>
    )}
      </div>}







    <div className='newNavbarRight'>
    <button className='newMobileSearchbox' onClick={()=>setSearchVisible(!searchVisible)}><IoSearchSharp size={30}/></button>
        <div className='newNavbarRight1'>
            <Avatar alt='img' sx={{ width: 56, height: 56 }} onClick={()=>getToken()?navigate("/profile/orders"):setLoginVisible(true)}><GiCharacter size={20}/></Avatar>
            <div className='newNavbarRight2'>
                <div className='newNavbarRight3'>
                    {getToken() ? 
                        <button onClick={() => navigate("/profile/orders")}>
                            {getUserDetails() && getUserDetails().customerName}
                        </button> 
                        : 
                        <button onClick={() => getToken() ? navigate('/') : setLoginVisible(true)}>
                            Account
                        </button>
                    }
                    <div className='newNavbarRight4'>
                        {getToken() ? 
                            <button onClick={handleLogout}>Logout</button> 
                            : 
                            <div>
                                <button onClick={() => setLoginVisible(true)}>Register</button> |
                                <button onClick={() => setLoginVisible(true)}>Login</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        {/* <button><Badge color="primary" badgeContent={0}><FaRegHeart size={30} /></Badge></button> */}
        <button>
            <Badge color="primary" badgeContent={getCart().length} onClick={() => handleNavigate()}>
                <BsBag size={30} />
            </Badge>
        </button>
    </div>
</div>
    </div>
  )
}

export default Navbar