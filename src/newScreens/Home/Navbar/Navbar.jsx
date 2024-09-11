import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Button, Snackbar } from '@mui/material'
import { GiCharacter } from "react-icons/gi";
import { BsBag } from "react-icons/bs";
import Badge from '@mui/material/Badge';
import { IoSearchSharp } from "react-icons/io5";

import './Navbar.css'
import { Logout, getCart, getLocationDetails, getToken, getUserDetails, setProductList } from '../../../utils/storage';
import { useNavigate } from 'react-router-dom';
import Login from '../../../screens/login/login';
import { farmItemService } from '../../../services/b2c_service';
import { AddCart, RemoveCart } from '../../../services/cart_service';
import logo from "../../../assets/logo.png"
import { UserContext } from '../../../helpers/createContext';

const Navbar = () => {
  const navigate = useNavigate()
  const [loginVisible, setLoginVisible] = useState(false);
  const [locationChanged, setLocationChanged] = useState()
  const [open, setOpen] = useState(false)
  const [productName, setProductName] = useState('')
  const [farmItem, setFarmItem] = useState([])
  const [cartData, setCartData] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [popup, setPopup] = useState(false)
  const { state, setState } = useContext(UserContext);

  useEffect(() => {
    setCartData(getCart())
    getCart()
  }, [state])

  useEffect(() => {
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
  }, [state])
  useEffect(() => {
    const handleWindowClick = (event) => {
      setProductName('')
    };
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [])
  const Add = (data) => {
    const value = AddCart(data);
    if (value) {
      setCartData(getCart());
      setState(getCart().length)
    }
  };
  const Remove = (data) => {
    const value = RemoveCart(data);
    if (value) {
      setCartData(getCart());
      setState(getCart().length)
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
    setPopup(!popup)
    Logout();
    navigate('/')
  };

  const handleRouting = (data) => {
    setProductName("")
    navigate(`/product/${data._id}`, { state: data });
  };

  return (
    <div className='newNavbar'>
      {popup && (<div className="popupScreen">
        <div className="popupScreens">
          <h2>!Alert</h2>
          <p>Please Confirm to logout</p>
          <div className="popupScreen-button">
            <Button variant="outlined" color="error" onClick={() => setPopup(!popup)}>No,Cancel</Button>
            <Button variant="contained" color="success" onClick={() => handleLogout()}>Yes,Confirm</Button>
          </div>
        </div>
      </div>)}
      {loginVisible && <Login handleClose={() => setLoginVisible(false)} />}
      <div className='newNavbar1'>
        {!searchVisible &&
          <div className='logo' onClick={() => navigate('/')}>
            <img src={logo} alt="img" />
            <h2>farm2bag</h2>
          </div>}
        <div className='navbar_searchbox'>
          <div className='newSearchbox'>
            <input type="text" name="search" id="search" placeholder='Search' onClick={(e) => e.stopPropagation()} value={productName} onChange={(e) => setProductName(e.target.value)} />
            <button><IoSearchSharp /></button>
          </div>
          {productName.length > 0 && (
            <div className="search-panel">
              {farmItem
                .filter((item) =>
                  item.productName.toLowerCase().includes(productName.toLowerCase())
                )
                .map((val, index) => (
                  <div className="search-item" key={index} onClick={(e) => {
                    e.stopPropagation();
                    handleRouting(val);
                  }}>
                    {val.image && (
                      <img src={val.image} alt="" className="search-item-image" />
                    )}
                    <div
                      className="search-details"
                    >
                      <h6 className="search-product-name">{val.productName}</h6>
                      <p className="search-product-price">
                        {val.unit} {val.unitValue} - ₹ {val.price}
                      </p>
                    </div>
                    <div className="search-cart-button">
                      {cartData.find((item) => item._id === val._id)?.quantity > 0 && (
                        <>
                          <button onClick={(e) => {
                            e.stopPropagation()
                            Remove(val)
                          }}>-</button>
                          <h5>{cartData.find((item) => item._id === val._id).quantity}</h5>
                        </>
                      )}
                      <button onClick={(e) => {
                        e.stopPropagation();
                        Add(val)
                      }}>+</button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {searchVisible &&
          <div className="navbar_searchbox">
            <div className='newMobileSearchbox'>
              <input type="text" name="search" id="search" placeholder='Search' onClick={(e) => e.stopPropagation()} value={productName} onChange={(e) => setProductName(e.target.value)} />
              <button><IoSearchSharp /></button>
            </div>
            {productName && (
              <div className="search-panel">
                {farmItem && farmItem
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
                        onClick={(e) => {
                          e.stopPropagation();
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
                            <button onClick={(e) => {
                              e.stopPropagation();
                              Remove(val)
                            }}>-</button>
                            <h5>{cartData.find((item) => item._id === val._id).quantity}</h5>
                          </>
                        )}
                        <button onClick={(e) => {
                          e.stopPropagation();
                          Add(val)
                        }}>+</button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>}



        <div className='newNavbarRight'>
          <button className='newMobileSearchbox' onClick={() => setSearchVisible(!searchVisible)}><IoSearchSharp size={30} /></button>
          <div className='newNavbarRight1'>
            <Avatar alt='img' sx={{ width: 40, height: 40 }} onClick={() => getToken() ? navigate("/profile/orders") : setLoginVisible(true)}><GiCharacter size={20} /></Avatar>
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
                    <button onClick={() => setPopup(!popup)}>Logout</button>
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
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
        message="Cart is Empty"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={"top" + "center"}
      />
    </div>
  )
}

export default Navbar