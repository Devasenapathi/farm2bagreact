import React from "react";
import { GiWallet } from "react-icons/gi";
import "./wallet.css";

const Wallet = () => {
  return (
    <div className="wallet">
      <div className="wallet-main">
        <div className="wallet-left">
          <p>Your Balance</p>
          <div className="wallet-left-sub"><h3>$100</h3><button>Add</button></div>
        </div>
        <div className="wallet-right">
          <GiWallet size={100} color="#F4C430"/>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
