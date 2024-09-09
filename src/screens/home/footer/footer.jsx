import React from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaTruck } from "react-icons/fa";
import googlePlay from "../../../assets/google_play.png";
import appStore from "../../../assets/appstore.png";
import "./footer.css";
import logo from "../../../assets/logo.png"
import { useNavigate } from "react-router-dom";
import { redirectToAppStore, redirectToPlayStore } from "../../../helpers/appRedirection";
import { BsCashCoin } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa6";

const FooterScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="footer">
      {/* <ul className="single-service">
        <li className="ervice-content">
          <FaTruck size={30} />
          <h4>Free Delivery</h4>
        </li>
        <li className="ervice-content">
          <BsCashCoin size={30} />
          <span>Cash On Delivery</span>
        </li>
        <li className="ervice-content">
          <FaBoxOpen size={30} />
          <span>1 Day Delivery</span>
        </li>
        <li className="ervice-content">
          <RiCustomerService2Fill size={30} />
          <span>Customer Support</span>
        </li>
      </ul> */}
      <hr />
      <div className="footer-main">
        <div className="footer-content">
          <div>
            <div className='logo' onClick={() => navigate('/')}>
              <img src={logo} alt="img" />
              <h2>farm2bag</h2>
            </div>
            <div className="footer-icons">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
              <FaLinkedin />
            </div>
          </div>
        </div>
        <div className="footer-content">
          <div>
            <p className="footer-p" onClick={() => navigate('/privacy')}>Privacy Policy</p>
            <p className="footer-p" onClick={() => navigate('/terms')}>Terms of use</p>
          </div>
        </div>
        <div className="footer-content">
          <div>
            <p className="footer-p" onClick={() => { navigate('/profile/customer', { state: "customer" }) }}>Contact us</p>
            <p className="footer-p" onClick={() => navigate('/aboutus')}>About us</p>
          </div>
        </div>
        <div className="footer-content">
          <p>Download the App</p>
          <img src={googlePlay} alt="img" onClick={redirectToPlayStore} />
          <img src={appStore} alt="img" onClick={redirectToAppStore} />
        </div>
        <div className="footer-content">
          <div>
            <p>Address</p>
            <p>
              3rd Floor, KJ Adithya Towers, Dr.Vikram Sharabhai Instronics
              Estate Phase II, SRP Tools, Thiruvanmiyur, Chennai,Tamilnadu -
              600041
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterScreen;
