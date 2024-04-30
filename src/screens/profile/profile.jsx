import React, { useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoWalletOutline } from "react-icons/io5";
import "./profile.css";
import { Logout, getUserDetails } from "../../utils/storage";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
const Profile = () => {
  const navigate = useNavigate()

  const handleChange = (e) => {
    navigate(e)
  };

  const handleLogout = () => {
    Logout();
    navigate('/')
  };

  return (
    <div className="profileScreen">
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
            <ul>
              <li onClick={() => handleChange("/profile/orders")}>
                <FaBagShopping /> Orders
              </li>
              {/* <li onClick={() => handleChange("/profile/wallet")}>
                <IoWalletOutline /> Wallet
              </li> */}
              <li onClick={() => handleChange("/profile/address")}>
                <FaAddressCard /> Addresses
              </li>
              <li onClick={() => handleChange("/profile/profile")}>
                <CgProfile /> Profile
              </li>
              <li onClick={() => handleChange("/profile/customer")}>
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
            <h4 onClick={handleLogout}>Logout</h4>
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
