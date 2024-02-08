import React, { useState } from "react";
import "./login.css";
import {
  loginService,
  signupService,
  verifyOtpService,
} from "../../services/login_service";
import { setToken, setUserDetails, setUserId } from "../../utils/storage";
import googlePlay from "../../assets/google_play.png";
import appStore from "../../assets/appstore.png";
const Login = ({ handleClose }) => {
  const [user, setUser] = useState({
    customerName: "",
    mobile: 0,
    email: "",
    codType: true,
    deliveryChargeType: false,
    hubPickUp: false,
    rewardPoints: 0,
  });
  const [signupVisible, setSignupVisible] = useState(false);
  const [otp, setOtp] = useState({
    otp: "",
    type: "",
  });
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleMobileValue = (value) => {
    if (error) {
      setError();
    }
    setUser({ ...user, [value.target.name]: value.target.value });
  };

  const handleOtpValue = (value, type) => {
    if (error) {
      setError();
    }
    setOtp({ otp: value, type: type });
  };

  const handleSignup = () => {
    signupService(user)
      .then((res) => {
        console.log(res.data);
        if (res.data.statusCode === 200) {
          setUserId(res.data.result._id);
          setUserDetails(res.data.result);
          setResponse(res);
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMobile = () => {
    loginService(user.mobile)
      .then((res) => {
        if (res.status === 200) {
          setUserId(res.data.result._id);
          setUserDetails(res.data.result);
          setResponse(res);
        } else {
          setError("user not found");
        }
      })
      .catch((err) => setError("user not found"));
  };

  const handleOtp = () => {
    console.log(otp,'kkkkkkkkkk')
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
      {signupVisible ? (
        <div className="login-content">
          <div className="login-left">
            <div className="login-logo">
              <h1>Farm2bag Signup</h1>
              {response ? (
                <h2>OTP sent to {user.mobile}</h2>
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
                    value={otp.otp}
                    onChange={(e) => handleOtpValue(e.target.value, 2)}
                  ></input>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter mobile"
                    value={user.mobile}
                    onChange={(e) => handleMobileValue(e)}
                  ></input>
                  <input
                    type="text"
                    name="customerName"
                    id="customerName"
                    placeholder="Enter Name"
                    value={user.customerName}
                    onChange={(e) => handleMobileValue(e)}
                  />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={(e) => handleMobileValue(e)}
                  />
                </div>
              )}
              {error && <span>{error}</span>}
              <button onClick={response ? handleOtp : handleSignup}>
                {response ? "Verify OTP" : "Signup"}
              </button>
              <p>
                Existing customer?{" "}
                <span onClick={() => setSignupVisible(false)}>Login</span>
              </p>
              <p>
                By continuing, you agree to our Terms of Service <span>&</span>{" "}
                Privacy Policy
              </p>
            </div>
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
      ) : (
        <div className="login-content">
          <div className="login-left">
            <div className="login-logo">
              <h1>Farm2bag</h1>
              {response ? (
                <h2>OTP sent to {user.mobile}</h2>
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
                    value={otp.opt}
                    onChange={(e) => handleOtpValue(e.target.value, 1)}
                  ></input>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter mobile"
                    value={user.mobile}
                    onChange={(e) => handleMobileValue(e)}
                  ></input>
                </div>
              )}
              {error && <span>{error}</span>}
              <button onClick={response ? handleOtp : handleMobile}>
                {response ? "Verify OTP" : "Continue"}
              </button>

              <p>
                Are you a new customer?{" "}
                <span onClick={() => setSignupVisible(true)}>Signup</span>
              </p>
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
      )}
    </div>
  );
};

export default Login;
