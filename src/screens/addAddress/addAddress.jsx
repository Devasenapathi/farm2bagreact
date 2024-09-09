import React, { useState } from "react";
import "./addAddress.css";
import { saveAddressService } from "../../services/customer_service";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Button } from "@mui/material";

const AddAddress = ({ handleClose }) => {
  const [address, setAddress] = useState({
    doorNo: "",
    area: "",
    district: "",
    pincode: "",
    landmark: "",
    addressType: ""
  });

  const [errors, setErrors] = useState({
    doorNo: "",
    area: "",
    district: "",
    pincode: "",
    landmark: "",
    addressType: ""
  });

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;

    if (!address.doorNo) {
      newErrors.doorNo = "Door No is required";
      isValid = false;
    }
    if (!address.area) {
      newErrors.area = "Area is required";
      isValid = false;
    }
    if (!address.district) {
      newErrors.district = "District is required";
      isValid = false;
    }
    if (!address.pincode) {
      newErrors.pincode = "Pincode is required";
      isValid = false;
    }
    if (!address.landmark) {
      newErrors.landmark = "Landmark is required";
      isValid = false;
    }
    if (!address.addressType) {
      newErrors.addressType = "Address Type is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const isFormValid = Object.values(address).every(value => value.trim() !== "");

  const handleChange = (e) =>{
    setAddress({...address,[e.target.name]:e.target.value})
  }

  const handleAddress = () =>{
    const addressValue = {...address,'fullAddress':address.doorNo+','+address.area+','+address.district+'-'+address.pincode}
    if(validateFields()){
      saveAddressService(addressValue).then((res)=>{
        if(res.status === 200){
          handleClose()
        }
      }).catch((err)=>{console.log(err)})
    }
  }
  return (
    <div className="overlay">
    <div className="addAddress-content">
      <div className="closeBtn">
        <IoIosCloseCircleOutline size={20} onClick={() =>  handleClose() }/>
      </div>
      <div className="addAddress-content1">
        <h3>Edit Address</h3>
        <label htmlFor="doorNo">Door No</label>
        <input
          type="text"
          id="doorNo"
          value={address.doorNo}
          name="doorNo"
          placeholder="Enter Door No"
          onChange={handleChange}
        />
        {errors.doorNo && <p className="error">{errors.doorNo}</p>}

        <label htmlFor="area">Area</label>
        <input
          type="text"
          id="area"
          value={address.area}
          name="area"
          placeholder="Enter Area"
          onChange={handleChange}
        />
        {errors.area && <p className="error">{errors.area}</p>}

        <label htmlFor="district">District</label>
        <input
          type="text"
          id="district"
          value={address.district}
          name="district"
          placeholder="Enter District"
          onChange={handleChange}
        />
        {errors.district && <p className="error">{errors.district}</p>}

        <label htmlFor="pincode">Pincode</label>
        <input
          type="number"
          id="pincode"
          value={address.pincode}
          name="pincode"
          placeholder="Enter Pincode"
          onChange={handleChange}
        />
        {errors.pincode && <p className="error">{errors.pincode}</p>}

        <label htmlFor="landmark">Landmark</label>
        <input
          type="text"
          id="landmark"
          value={address.landmark}
          name="landmark"
          placeholder="Enter Landmark"
          onChange={handleChange}
        />
        {errors.landmark && <p className="error">{errors.landmark}</p>}

        <h4>Address Type</h4>
        <div className="addAddress-type">
          <input
            type="radio"
            name="addressType"
            id="home"
            value="Home"
            checked={address.addressType === "Home"}
            onChange={handleChange}
          />
          <label htmlFor="home">Home</label>
        </div>
        <div className="addAddress-type">
          <input
            type="radio"
            name="addressType"
            value="Work"
            id="work"
            checked={address.addressType === "Work"}
            onChange={handleChange}
          />
          <label htmlFor="work">Work</label>
        </div>
        {errors.addressType && <p className="error">{errors.addressType}</p>}

        <Button onClick={handleAddress} disabled={!isFormValid}>Add</Button>
      </div>
    </div>
  </div>
  );
};

export default AddAddress;
