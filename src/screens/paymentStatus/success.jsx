import React, { useEffect } from "react";
import success from "../../assets/pay_Success.gif";
import "./paymentStatus.css";

const SuccessScreen = () => {
  return (
    <div className="overlay">
      <div className="content">
        <h3>Placed Successfully</h3>
        <img src={success} alt="img" className="image" />
        <div className="content1">
          <h5>Order Id</h5>
          <p>#123456789</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
