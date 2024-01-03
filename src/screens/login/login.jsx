import React, { useState } from 'react'
import "./login.css"
import { loginService, verifyOtpService } from '../../services/login_service'
import { setToken, setUserDetails, setUserId } from '../../utils/storage'
const Login = ({ handleClose }) => {
  const [mobileNumber, setMobileNumber] = useState()
  const [otp, setOtp] = useState()
  const [response, setResponse] = useState()

  const handleMobile = () => {
    loginService(mobileNumber).then((res) => {
      if (res.status === 200) {
        setUserId(res.data.result._id)
        setUserDetails(res.data.result)
        setResponse(res)
        setMobileNumber()
      } else {
        console.log('No user found')
      }
    }).catch((err) => console.log(err))
  }
  const handleOtp = () => {
    verifyOtpService(otp).then((res) => {
      if (res.status === 200) {
        setToken(res.data.result.token)
        handleClose()
      } else {
        console.log("Otp Error")
      }
    }).catch((err) => console.log(err, 'error'))
  }
  return (
    <div className='login-overlay'>
      <div className='login-content'>
        <div className='login-logo'>
          <h1>Farm2bag</h1>
        </div>
        <div className='login-main'>
          {response ?
            <div>
              <label><h3>OTP</h3></label>
              <input type='text' name='otp' id='otp' placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)}></input>
            </div> :
            <div>
              <label><h3>Mobile Number</h3></label>
              <input type='text' name='mobileNumber' id='mobileNumber' placeholder='Enter Mobilenumber' value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}></input>
            </div>
          }
          <submit onClick={response ? handleOtp : handleMobile}>{response ? "Verify OTP" : "Send OTP"}</submit>
          <p>new customer? SignUp</p>
        </div>
      </div>
    </div>
  )
}

export default Login
