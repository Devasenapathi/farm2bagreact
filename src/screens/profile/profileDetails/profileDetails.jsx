import React, { useEffect, useState } from "react";
import "./profileDetails.css";
import { Logout, getUserDetails } from "../../../utils/storage";
import {
  customerDeleteService,
  getCustomerService,
  updateCustomerService,
} from "../../../services/customer_service";
import ToastSuccess from "../../../helpers/toastSuccess";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    customerName: "",
    email: "",
    mobile: "",
  });
  useEffect(() => {
    setUser({
      customerName: getUserDetails().customerName,
      email: getUserDetails().email,
      mobile: getUserDetails().mobile,
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

  const handleDelete = () =>{
    console.log(getUserDetails()._id)
    customerDeleteService({_id:getUserDetails()._id}).then((res)=>{
      if(res.status === 200){
        Logout();
        navigate('/')
      }
    }).catch((err)=>{console.log(err,'handle delete')})
  }

  return (
    <div className="profileDetails">
      {/* <ToastSuccess/> */}
      <div className="profileDetails1">
        <div className="profileDetails0">
        <h2>Profile</h2>
        <button onClick={handleDelete}>Delete Account</button>
        </div>
        <div className="profileDetails2">
          <input
            type="text"
            name="customerName"
            placeholder="Enter Name"
            value={user.customerName}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="mobile"
            placeholder="Enter Mobile"
            value={user.mobile}
            onChange={(e) => handleChange(e)}
          />
          <button onClick={handleUpdate}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
