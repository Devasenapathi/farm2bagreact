import React from "react";
import failed from "../../assets/pay_Fail.gif";
import "./paymentStatus.css";

const FailedScreen = () => {
  return (
    <div className="overlay">
      <div className="content">
        <h3>Order Failed</h3>
        <img src={failed} alt="img" className="image" />
      </div>
    </div>
  );
};

export default FailedScreen;
