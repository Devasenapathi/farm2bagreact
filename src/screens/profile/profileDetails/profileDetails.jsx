import React, { useEffect, useState } from "react";
import "./profileDetails.css";
import { Logout, getUserDetails } from "../../../utils/storage";
import {
  customerDeleteService,
  getCustomerService,
  updateCustomerService,
} from "../../../services/customer_service";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProfileDetails = () => {
  const navigate = useNavigate();
  const [popup,setPopup] = useState(false)
  const [user, setUser] = useState({
    customerName: "",
    email: "",
    mobile: "",
  });
  const [initialUser, setInitialUser] = useState({
    customerName: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    const userDetails = getUserDetails();
    setUser({
      customerName: userDetails.customerName,
      email: userDetails.email,
      mobile: userDetails.mobile,
    });
    setInitialUser({
      customerName: userDetails.customerName,
      email: userDetails.email,
      mobile: userDetails.mobile,
    });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    updateCustomerService(user)
      .then((res) => {
        if (res.status === 200) {
          getCustomerService()
            .then((res) => {
              if (res.status === 200) {
                toast.success("Updated Successfully")
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    customerDeleteService({ _id: getUserDetails()._id })
      .then((res) => {
        if (res.status === 200) {
          Logout();
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err, 'handle delete');
      });
  };

  const hasChanges = () => {
    return (
      user.customerName !== initialUser.customerName ||
      user.email !== initialUser.email ||
      user.mobile !== initialUser.mobile
    );
  };

  return (
    <div className="profileDetails">
      <ToastContainer/>
      <div className="profileDetails1">
        <div className="profileDetails0">
          <h2>Profile</h2>
          <Button onClick={()=>setPopup(!popup)}>Delete Account</Button>
        </div>
        <div className="profileDetails2">
          <input
            type="text"
            name="customerName"
            placeholder="Enter Name"
            value={user.customerName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mobile"
            placeholder="Enter Mobile"
            value={user.mobile}
            onChange={handleChange}
          />
          <button onClick={handleUpdate} disabled={!hasChanges()} className={hasChanges()?"enableEdit":"disableEdit"}>
            Edit
          </button>
        </div>
      </div>
      {popup&&(<div className="popupScreen">
        <div className="popupScreens">
        <h2>Confirmation</h2>
        <p>Are you really like to delete the account</p>
        <div className="popupScreen-button">
          <Button variant="outlined" color="error" onClick={()=>setPopup(!popup)}>No,Cancel</Button>
          <Button variant="contained" color="success" onClick={()=>handleDelete()}>Yes,Confirm</Button>
        </div>
        </div>
      </div>)}
    </div>
  );
};

export default ProfileDetails;
