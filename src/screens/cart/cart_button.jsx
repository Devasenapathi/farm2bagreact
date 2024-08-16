import React, { useEffect, useState } from "react";
import { getCart, getToken } from "../../utils/storage";
import { Link, useNavigate } from "react-router-dom";
import "./cart_button.css";
import { FaShoppingCart } from "react-icons/fa";
import Login from "../login/login";
import { Snackbar } from "@mui/material";
const CartButton = ({ cart }) => {
  const navigate = useNavigate()
  const [loginVisible, setLoginVisible] = useState(false);
  const [open, setOpen] = useState(false)
  const [cartValue, setCartValue] = useState(0)
  useEffect(() => {
    setCartValue(getCart().length)
  }, [getCart()])

  const handleNavigate = () => {
    if (getToken()) {
      if (getCart().length > 0) {
        navigate('/checkout')
      } else {
        setOpen(true)
      }
    } else {
      setLoginVisible(true);
    }
  }
  return (
    <>
      <div className="bottom-cart-button">
        {loginVisible && <Login handleClose={() => setLoginVisible(false)} />}
        <div onClick={() => handleNavigate()} className="bottom-cart">
          <FaShoppingCart size={25} />
        </div>
        <div className="bottom-cart-value">{cartValue}</div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={()=>setOpen(false)}
        message="Cart is Empty"
        anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
        key={"bottom" + "center"}
      />
    </>
  );
};

export default CartButton;
