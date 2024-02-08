import React, { useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoWalletOutline } from "react-icons/io5";
import "./profile.css";
import { Logout, getUserDetails } from "../../utils/storage";
import Orders from "./orders/orders";
import Wallet from "./wallet/wallet";
import Address from "./address/address";
import ProfileDetails from "./profileDetails/profileDetails";
import CustomerSupport from "./customerSupport/customerSupport";
import { useLocation } from "react-router-dom";
const Profile = () => {
  const location = useLocation()

  useEffect(()=>{
    if(location.state){
      setVisible(location.state)
    }
  },[])
  const [visible, setVisible] = useState("orders");

  const handleChange = (e) => {
    setVisible(e);
  };

  const handleLogout = () => {
    Logout();
  };

  return (
    <div className="profileScreen">
      <div className="profileScreen-main">
        <div className="profileScreen-left">
          <div className="profileScreen-left1">
            <h3>My Account</h3>
            <div className="profileScreen-leftSub">
              <h5>{getUserDetails().customerName}</h5>
              <h5>+91 {getUserDetails().mobile}</h5>
            </div>
          </div>
          <hr />
          <div className="profileScreen-left2">
            <ul>
              <li onClick={() => handleChange("orders")}>
                <FaBagShopping /> Orders
              </li>
              <li onClick={() => handleChange("wallet")}>
                <IoWalletOutline /> Wallet
              </li>
              <li onClick={() => handleChange("address")}>
                <FaAddressCard /> Addresses
              </li>
              <li onClick={() => handleChange("profile")}>
                <CgProfile /> Profile
              </li>
              <li onClick={() => handleChange("customer")}>
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
          {visible === "orders" && <Orders />}
          {visible === "wallet" && <Wallet />}
          {visible === "address" && <Address />}
          {visible === "profile" && <ProfileDetails />}
          {visible === "customer" && <CustomerSupport />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
