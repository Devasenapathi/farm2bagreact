import React from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import googlePlay from "../../../assets/google_play.png";
import appStore from "../../../assets/appstore.png";

import "./footer.css";
import { useNavigate } from "react-router-dom";

const FooterScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <hr />
      <div className="footer-main">
        <div className="footer-content">
          <div>
            <h1>farm2bag</h1>
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
            <p className="footer-p" onClick={()=>navigate('/terms')}>Privacy Policy</p>
            <p className="footer-p" onClick={()=>navigate('/privacy')}>Terms of use</p>
          </div>
        </div>
        <div className="footer-content">
          <div>
            <p className="footer-p" onClick={()=>{navigate('/profile',{state:"customer"})}}>Contact us</p>
            <p className="footer-p" onClick={()=>navigate('/aboutus')}>About us</p>
          </div>
        </div>
        <div className="footer-content">
          <p>Download the App</p>
          <img src={googlePlay} alt="img" />
          <img src={appStore} alt="img" />
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