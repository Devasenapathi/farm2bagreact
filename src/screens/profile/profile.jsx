import React, { useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "./profile.css";
import { Logout, getUserDetails } from "../../utils/storage";
import { Outlet, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "@mui/material";
import useScrollToTop from "../../helpers/useScrollToTop";
const Profile = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const [popup,setPopup] = useState(false)

  const handleChange = (e) => {
    setActiveItem(e);
    navigate(e)
  };

  const handleLogout = () => {
    Logout();
    navigate('/')
  };

  const [activeItem, setActiveItem] = useState('/profile/orders');



  return (
    <div className="profileScreen">
      {popup&&(<div className="popupScreen">
        <div className="popupScreens">
        <h2>!Alert</h2>
        <p>Please Confirm to logout</p>
        <div className="popupScreen-button">
          <Button variant="outlined" color="error" onClick={()=>setPopup(!popup)}>No,Cancel</Button>
          <Button variant="contained" color="success" onClick={()=>handleLogout()}>Yes,Confirm</Button>
        </div>
        </div>
      </div>)}
      <div className="profileScreen-main">
        <div className="profileScreen-left">
          <div className="profileScreen-left1">
            <h3> <IoMdArrowRoundBack size={30} onClick={() => navigate(-1)} /> My Account</h3>
            <div className="profileScreen-leftSub">
              <h5>{getUserDetails().customerName}</h5>
              <h5>+91 {getUserDetails().mobile}</h5>
            </div>
          </div>
          <hr />
          <div className="profileScreen-left2">
          <ul className="sidebar-list">
      <li
        className={activeItem === '/profile/orders' ? 'active' : ''}
        onClick={() => handleChange('/profile/orders')}
      >
        <FaBagShopping /> Orders
      </li>
      {/* <li className={activeItem === '/profile/wallet' ? 'active' : ''} onClick={() => handleChange('/profile/wallet')}>
        <IoWalletOutline /> Wallet
      </li> */}
      <li
        className={activeItem === '/profile/address' ? 'active' : ''}
        onClick={() => handleChange('/profile/address')}
      >
        <FaAddressCard /> Addresses
      </li>
      <li
        className={activeItem === '/profile/profile' ? 'active' : ''}
        onClick={() => handleChange('/profile/profile')}
      >
        <CgProfile /> Profile
      </li>
      <li
        className={activeItem === '/profile/customer' ? 'active' : ''}
        onClick={() => handleChange('/profile/customer')}
      >
        <RiCustomerService2Line /> Customer Support
      </li>
    </ul>
          </div>
          <div className="profileScreen-mobile-left2">
            <ul>
              <li onClick={() => navigate('/previous_orders')}>
                <FaBagShopping /> Orders
              </li>
              {/* <li onClick={() => navigate('/wallet')}>
                <IoWalletOutline /> Wallet
              </li> */}
              <li onClick={() => navigate('/addresses')}>
                <FaAddressCard /> Addresses
              </li>
              <li onClick={() => navigate('/profileDetails')}>
                <CgProfile /> Profile
              </li>
              <li onClick={() => navigate('/customer')}>
                <RiCustomerService2Line /> Customer Support
              </li>
            </ul>
          </div>
          <hr />
          <div className="profileScreen-left3">
            <h4 onClick={()=>setPopup(!popup)}>Logout</h4>
          </div>
        </div>
        <div className="profileScreen-right">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
