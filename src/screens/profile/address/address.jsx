import React, { useEffect, useState } from "react";
import {
  CustomerAddressService,
  deleteAddress,
  updateAddressService,
} from "../../../services/customer_service";
import { getLocationDetails, getUserId } from "../../../utils/storage";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { Snackbar } from "@mui/material";

import "./address.css";

const Address = () => {
  const [addressList, setAddressList] = useState([]);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [open,setOpen] = useState(false)
  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = () => {
    CustomerAddressService(getUserId())
      .then((res) => {
        if (res.status === 200) {
          setAddressList(res.data.result.addressDetails);
        } else {
          console.log("error in else of address list");
        }
      })
      .catch((err) => console.log(err, "error got"));
  };

  const handleAddress = (value) => {
    setSelectedAddress(value);
  };

  const handleDelete = (value) => {
    deleteAddress({"customerId":value._id,"_id":value._id}).then((res)=>{
      if(res.status === 200){
        setOpen(true)
        getAddress()
      }
    }).catch((err)=>{console.log(err)})
  };

  const handleChanges = (e) => {
    setSelectedAddress({ ...selectedAddress, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const value = {...selectedAddress,"fullAddress":selectedAddress.doorNo+','+selectedAddress.area+','+getLocationDetails().district+'-'+selectedAddress.pincode}
    updateAddressService(value)
      .then((res) => {
        if (res.status === 200) {
          setUpdateVisible(!updateVisible);
          getAddress();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="addresses">
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={()=>setOpen(false)}
        message="Address Deleted successfully"
        anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
        key={"bottom" + "center"}
      />
      {addressList.map((val, index) => {
        return (
          <div className="addresses1">
            <div className="addresses-left" key={index}>
              <h4>{val.addressType}</h4>
              <p>{val.fullAddress}</p>
            </div>
            <div className="addresses-right">
              <button
                className="addresses-right-button1"
                onClick={() => {
                  handleAddress(val);
                  setUpdateVisible(!updateVisible);
                }}
              >
                <MdEditSquare size={20} color="#fff" />
              </button>
              <button
                className="addresses-right-button2"
                onClick={() => {
                  handleDelete(val);
                }}
              >
                <MdDelete size={20} color="#fff" />
              </button>
            </div>
          </div>
        );
      })}
      {updateVisible && (
        <div className="overlay">
          <div className="updateAddress-content">
            <div className="closeBtn">
              <IoCloseCircle
                size={30}
                onClick={() => setUpdateVisible(!updateVisible)}
              />
            </div>
            <div className="updateAddress-content1">
              <h3>Edit Address</h3>
              {/* <label htmlFor="">Mobile Number</label>
            <input type="text" placeholder="Enter Mobile" /> */}
              <label htmlFor="doorNo">Door No</label>
              <input
                type="text"
                id="doorNo"
                name="doorNo"
                value={selectedAddress.doorNo}
                placeholder="Enter Door No"
                onChange={(e) => handleChanges(e)}
              />
              <label htmlFor="area">Area</label>
              <input
                type="text"
                id="area"
                name="area"
                value={selectedAddress.area}
                placeholder="Enter Area"
                onChange={(e) => handleChanges(e)}
              />
              {/* <label htmlFor="">District</label>
            <input type="text" placeholder="Enter District" /> */}
              <label htmlFor="pincode">Pincode</label>
              <input
                type="Number"
                id="pincode"
                name="pincode"
                value={selectedAddress.pincode}
                placeholder="Enter Pincode"
                onChange={(e) => handleChanges(e)}
              />
              <label htmlFor="landmark">Landmark</label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                value={selectedAddress.landmark}
                placeholder="Enter Landmark"
                onChange={(e) => handleChanges(e)}
              />
              <p>Address Type</p>
              <div className="updateAddress-type">
                <input
                  type="radio"
                  name="addressType"
                  id="home"
                  value="Home"
                  checked={selectedAddress.addressType === "Home"}
                  onChange={(e) => handleChanges(e)}
                />
                <label htmlFor="home">Home</label>
              </div>
              <div className="updateAddress-type">
                <input
                  type="radio"
                  name="addressType"
                  value="Work"
                  id="home"
                  checked={selectedAddress.addressType === "Work"}
                  onChange={(e) => handleChanges(e)}
                />
                <label htmlFor="home">Work</label>
              </div>
              <button onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
