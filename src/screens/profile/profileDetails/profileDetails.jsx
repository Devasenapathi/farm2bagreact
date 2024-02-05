import React, { useEffect, useState } from "react";
import "./profileDetails.css";
import { getUserDetails } from "../../../utils/storage";

const ProfileDetails = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  useEffect(() => {
    setUser({
      name: getUserDetails().customerName,
      email: getUserDetails().email,
      mobile: getUserDetails().mobile,
    });
  }, []);

  const handleChange = (e) => {};
  return (
    <div className="profileDetails">
      <div className="profileDetails1">
        <h2>Profile Details</h2>
        <div className="profileDetails2">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={user.name}
            onChange={(e)=>handleChange(e)}
          />
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={(e)=>handleChange(e)}
          />
          <input
            type="text"
            name="mobile"
            placeholder="Enter Mobile"
            value={user.mobile}
            onChange={(e)=>handleChange(e)}
          />
          <button>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
