import React, { useEffect, useState } from "react";
import { CustomerAddressService } from "../../../services/customer_service";
import { getUserId } from "../../../utils/storage";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./address.css";

const Address = () => {
  const [addressList, setAddressList] = useState([]);
  const [updateVisible, setUpdateVisible] = useState(false);
  useEffect(() => {
    CustomerAddressService(getUserId())
      .then((res) => {
        if (res.status === 200) {
          setAddressList(res.data.result.addressDetails);
        } else {
          console.log("error in else of address list");
        }
      })
      .catch((err) => console.log(err, "error got"));
  }, []);

  const handleAddress = (value) => {};

  const handleDelete = (value) => {};
  return (
    <div className="addresses">
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
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <button>Update</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
