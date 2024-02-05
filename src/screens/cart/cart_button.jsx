import React, { useEffect, useState } from "react";
import { getCart } from "../../utils/storage";
import { Link } from "react-router-dom";
import "./cart_button.css";
import { FaShoppingCart } from "react-icons/fa";
const CartButton = () => {
  const [cartValue, setCartValue] = useState(0)
  useEffect(()=>{
    setCartValue(getCart().length)
  },[getCart().length])
  return (
    <div className="bottom-cart-button">
      <Link to={"/checkout"} className="bottom-cart">
        <FaShoppingCart size={25} />
      </Link>
      <div className="bottom-cart-value">{cartValue}</div>
    </div>
  );
};

export default CartButton;
