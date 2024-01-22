import React, { useEffect } from "react";
import { getCart } from "../../utils/storage";
import { Link } from "react-router-dom";
import "./cart_button.css";
import { FaShoppingCart } from "react-icons/fa";
const CartButton = () => {
  return (
    <div className="bottom-cart-button">
      <Link to={"/checkout"} className="bottom-cart">
        <FaShoppingCart size={25} />
      </Link>
      <div className="bottom-cart-value">{getCart().length}</div>
    </div>
  );
};

export default CartButton;
