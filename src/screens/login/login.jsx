import React, { useState } from "react";
import "./login.css";
import { loginService, verifyOtpService } from "../../services/login_service";
import { setToken, setUserDetails, setUserId } from "../../utils/storage";
import googlePlay from "../../assets/google_play.png";
import appStore from "../../assets/appstore.png";
const Login = ({ handleClose }) => {
  const [mobileNumber, setMobileNumber] = useState();
  const [otp, setOtp] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("")

  const handleMobileValue = (value) => {
    if(error){
      setError()
    }
    setMobileNumber(value);
  };

  const handleOtpValue = (value) => {
    if(error){
      setError()
    }
    setOtp(value);
  };

  const handleMobile = () => {
    loginService(mobileNumber)
      .then((res) => {
        if (res.status === 200) {
          setUserId(res.data.result._id);
          setUserDetails(res.data.result);
          setResponse(res);
        } else {
          setError('user not found')
        }
      })
      .catch((err) => setError('user not found'));
  };
  const handleOtp = () => {
    verifyOtpService(otp)
      .then((res) => {
        if (res.status === 200) {
          setToken(res.data.result.token);
          handleClose();
        } else {
          setError("Invalid OTP");
        }
      })
      .catch((err) => setError("Invalid OTP"));
  };
  return (
    <div className="login-overlay">
      <div className="login-content">
        <div className="login-left">
          <div className="login-logo">
            <h1>Farm2bag</h1>
            {response ? (
              <h2>OTP sent to {mobileNumber}</h2>
            ) : (
              <h2>Groceries Delivered at doorstep</h2>
            )}
          </div>
          <div className="login-main">
            {response ? (
              <div>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => handleOtpValue(e.target.value)}
                ></input>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber"
                  placeholder="Enter Mobilenumber"
                  value={mobileNumber}
                  onChange={(e) => handleMobileValue(e.target.value)}
                ></input>
              </div>
            )}
            {error&&<span>{error}</span>}
            <button onClick={response ? handleOtp : handleMobile}>
              {response ? "Verify OTP" : "Continue"}
            </button>
          </div>
          <p>
            By continuing, you agree to our Terms of Service <span>&</span>{" "}
            Privacy Policy
          </p>
        </div>
        <div className="login-right">
          <div className="login-right-image"></div>
          <h4>Order faster and easier</h4>
          <p>with farm2bag app</p>
          <div className="login-right-logo">
            <img src={googlePlay} alt="img" />
            <img src={appStore} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
