import React, { useEffect, useState } from "react";
import "./profileDetails.css";
import { getUserDetails } from "../../../utils/storage";
import {
  getCustomerService,
  updateCustomerService,
} from "../../../services/customer_service";
import ToastSuccess from "../../../helpers/toastSuccess";

const ProfileDetails = () => {
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

  return (
    <div className="profileDetails">
      {/* <ToastSuccess/> */}
      <div className="profileDetails1">
        <h2>Profile Details</h2>
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
