import React, { useState } from "react";
import "./addAddress.css";
import { IoCloseCircle } from "react-icons/io5";
import { getLocationDetails } from "../../utils/storage";
import { saveAddressService } from "../../services/customer_service";

const AddAddress = ({ handleClose }) => {
  const [address, setAddress] = useState({
    doorNo: "",
    area: "",
    district: getLocationDetails().district,
    pincode: "",
    landmark: "",
    addressType: "",
  });

  const handleChange = (e) =>{
    setAddress({...address,[e.target.name]:e.target.value})
  }

  const handleAddress = () =>{
    const addressValue = {...address,'fullAddress':address.doorNo+','+address.area+','+address.district+'-'+address.pincode}
    saveAddressService(addressValue).then((res)=>{
      if(res.status === 200){
        handleClose()
      }
    }).catch((err)=>{console.log(err)})
  }
  return (
    <div className="overlay">
      <div className="addAddress-content">
        <div className="closeBtn">
          <IoCloseCircle size={30} onClick={handleClose} />
        </div>
        <div className="addAddress-content1">
          <h3>Edit Address</h3>
          {/* <label htmlFor="">Mobile Number</label>
            <input type="text" placeholder="Enter Mobile" /> */}
          <label htmlFor="doorNo">Door No</label>
          <input
            type="text"
            id="doorNo"
            value={address.doorNo}
            name="doorNo"
            placeholder="Enter Door No"
            onChange={(e)=>handleChange(e)}
          />
          <label htmlFor="area">Area</label>
          <input
            type="text"
            id="area"
            value={address.area}
            name="area"
            placeholder="Enter Area"
            onChange={(e)=>handleChange(e)}
          />
          <label htmlFor="district">District</label>
          <input
            type="text"
            id="district"
            value={address.district}
            name="district"
            placeholder="Enter District"
            onChange={(e)=>handleChange(e)}
          />
          <label htmlFor="pincode">Pincode</label>
          <input
            type="Number"
            id="pincode"
            value={address.pincode}
            name="pincode"
            placeholder="Enter Pincode"
            onChange={(e)=>handleChange(e)}
          />
          <label htmlFor="landmark">Landmark</label>
          <input
            type="text"
            id="landmark"
            value={address.landmark}
            name="landmark"
            placeholder="Enter Landmark"
            onChange={(e)=>handleChange(e)}
          />
          <p>Address Type</p>
          <div className="addAddress-type">
            <input
              type="radio"
              name="addressType"
              id="home"
              value="Home"
              checked={address.addressType === "Home"}
              onChange={(e)=>handleChange(e)}
            />
            <label htmlFor="home">Home</label>
          </div>
          <div className="addAddress-type">
            <input
              type="radio"
              name="addressType"
              value="Work"
              id="home"
              checked={address.addressType === "Work"}
              onChange={(e)=>handleChange(e)}
            />
            <label htmlFor="home">Work</label>
          </div>
          <button onClick={handleAddress}>add</button>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
