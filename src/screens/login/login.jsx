import React, { useState } from "react";
import "./login.css";
import {
  loginService,
  resentOtpService,
  signupService,
  verifyOtpService,
} from "../../services/login_service";
import { getUserId, setToken, setUserDetails, setUserId } from "../../utils/storage";
import googlePlay from "../../assets/google_play.png";
import appStore from "../../assets/appstore.png";
import logo from '../../assets/logo.png';
// import { IoMdClose } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { redirectToAppStore, redirectToPlayStore } from "../../helpers/appRedirection";
import { Link } from "react-router-dom";


const Login = ({ handleClose,visible }) => {
  const [user, setUser] = useState({
    customerName: "",
    mobile: '',
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

  const handleOtpValue = (e, type) => {
    if (error) {
      setError();
    }
    setOtp({ otp: e.target.value, type: type });
  };

  const handleSignup = () => {
    signupService(user)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUserId(res.data.result._id);
          setUserDetails(res.data.result);
          setResponse(res);
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setError(err.response.data.message)
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

  const handleResend = () => {
    resentOtpService(getUserId()).then((res) => {
      if (res.status === 200) {
        console.log("")
      } else {
        console.log("")
      }
    }).catch((err) => { console.log(err) })
  }

  return (
    <div className="login-overlay">
      {signupVisible ? (
        <div className="login-content">
          <div className="login-left">
          <div className="closebtn1">
            <IoMdCloseCircle size={30} color="black" onClick={() => handleClose()}/>
          </div>
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
                    type="Number"
                    name="otp"
                    id="otp"
                    maxLength="6"
                    placeholder="Enter OTP"
                    value={otp.otp}
                    onChange={(e) => handleOtpValue(e, 2)}
                  ></input>
                </div>
              ) : (
                <div>
                  <input
                    type="Number"
                    name="mobile"
                    id="mobile"
                    maxLength="10"
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
            <div className="login-right-image">
              <img src={logo} alt="img" />
            </div>
            <h4>Order faster and easier</h4>
            <p>with farm2bag app</p>
            <div className="login-right-logo">
              <img src={googlePlay} alt="img" />
              <img src={appStore} alt="img" />
            </div>
          </div>
          <div className="closebtn">
            <IoMdCloseCircle size={30} color="black" onClick={() => handleClose()}/>
          </div>
        </div>
      ) : (
        <div className="login-content">
          <div className="login-left">
          <div className="closebtn1">
            <IoMdCloseCircle size={30} color="black" onClick={() => handleClose()}/>
          </div>
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
                    type="Number"
                    name="otp"
                    id="otp"
                    maxLength="6"
                    placeholder="Enter OTP"
                    value={otp.otp}
                    onChange={(e) => handleOtpValue(e, 1)}
                  ></input>
                </div>
              ) : (
                <div>
                  <input
                    type="Number"
                    name="mobile"
                    id="mobile"
                    maxLength="10"
                    placeholder="Enter Mobilenumber"
                    value={user.mobile}
                    onChange={(e) => handleMobileValue(e)}
                  ></input>
                </div>
              )}
              {error && <span>{error}</span>}
              {response && <div onClick={() => handleResend()}>Resend OTP?</div>}
              <button onClick={response ? handleOtp : handleMobile}>
                {response ? "Verify OTP" : "Continue"}
              </button>

              <p>
                Are you a new customer?{" "}
                <span onClick={() => setSignupVisible(true)}>Signup</span>
              </p>
            </div>
            <p>
              By continuing, you agree to our <Link to={"/terms"}>Terms of Service</Link> <span>&</span>{" "}
              <Link to={"/privacy"}>Privacy Policy</Link>
            </p>
          </div>
          <div className="login-right">

            <div className="login-right-image">
              <img src={logo} alt="img" />
            </div>
            <h4>Order faster and easier</h4>
            <p>with farm2bag app</p>
            <div className="login-right-logo">
              <img src={googlePlay} alt="img" onClick={redirectToPlayStore} />
              <img src={appStore} alt="img" onClick={redirectToAppStore} />
            </div>
          </div>
          <div className="closebtn">
            <IoMdCloseCircle size={30} color="black" onClick={() => handleClose()}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
