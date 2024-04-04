import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Logout, getCart, getProductList, getToken } from "../../utils/storage";
import { AddCart, RemoveCart } from "../../services/cart_service";
import { CiLogout } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import Login from "../login/login";
import { CircularProgress, Snackbar } from "@mui/material";

const Navbar = ({ location, locationChanged, handleOpen }) => {
  const navigate = useNavigate();
  const [loginVisible, setLoginVisible] = useState(false);
  const [farmItem, setFarmItem] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [productName, setProductName] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [open, setOpen] = useState()

  useEffect(() => {
    setFarmItem(getProductList());
  }, [locationChanged]);

  const Add = (data) => {
    const value = AddCart(data);
    if (value) {
      setCartData(getCart());
    }
  };
  const Remove = (data) => {
    const value = RemoveCart(data);
    if (value) {
      setCartData(getCart());
    }
  };
  const handleRouting = (data) => {
    navigate("/product", { state: data });
  };

  const handleDropProfile = () => {
    if (getToken() === null || undefined) {
      setLoginVisible(true);
    } else {
      navigate("/profile/orders");
    }
  };

  const handleNavigate = () => {
    if(getToken()){
      if (getCart().length > 0) {
        navigate('/checkout')
      } else {
        setOpen(true)
      }
    }else{
      setLoginVisible(true)
    }
  };


  return (
    <div className="navbar_main">
      {loginVisible && <Login handleClose={() => setLoginVisible(false)} />}
      <div className="navbar_logo">
        <h4>Farm2bag</h4>
      </div>
      <div className="navbar_searchbox">
        <input
          type="text"
          className="navbar_text"
          value={productName}
          name="search"
          placeholder="Search"
          onChange={(e) => setProductName(e.target.value)}
        ></input>
        {productName.length > 0 && (
          <div className="search-panel">
            {farmItem &&
              farmItem
                .filter((item) => {
                  return (
                    item.productName
                      .toLowerCase()
                      .indexOf(productName.toLowerCase()) > -1
                  );
                })
                .map((val, index) => {
                  return (
                    <div className="search-item" key={index}>
                      {val.image ? (
                        <img
                          src={val.image}
                          alt=""
                          className="search-item-image"
                        ></img>
                      ) : (
                        ""
                      )}
                      <div
                        className="search-details"
                        onClick={() => {
                          handleRouting(val);
                        }}
                      >
                        <h6 className="search-product-name">
                          {val.productName}
                        </h6>
                        <p className="search-product-price">
                          {val.unit} {val.unitValue} - ₹ {val.price}
                        </p>
                      </div>
                      <div className="cart-button">
                        {cartData.find((item) => item._id === val._id) !==
                          undefined &&
                        cartData.find((item) => item._id === val._id).quantity >
                          0 ? (
                          <button onClick={() => Remove(val)}>-</button>
                        ) : (
                          ""
                        )}
                        {cartData.find((item) => item._id === val._id) !==
                          undefined &&
                        cartData.find((item) => item._id === val._id).quantity >
                          0 ? (
                          <h5>
                            {
                              cartData.find((item) => item._id === val._id)
                                .quantity
                            }
                          </h5>
                        ) : (
                          ""
                        )}
                        <button onClick={() => Add(val)}>+</button>
                      </div>
                    </div>
                  );
                })}
          </div>
        )}
      </div>
      {location?<h4 onClick={handleOpen}>{location}</h4>:<CircularProgress size={12} color="success" />}
      <div className="navbar_mobile_search">
        <input
          type="text"
          className="navbar_search_text"
          value={productName}
          name="search"
          placeholder="Search"
          onChange={(e) => setProductName(e.target.value)}
        ></input>
        {productName.length > 0 && (
          <div className="mobile_search-panel">
            {farmItem &&
              farmItem
                .filter((item) => {
                  return (
                    item.productName
                      .toLowerCase()
                      .indexOf(productName.toLowerCase()) > -1
                  );
                })
                .map((val, index) => {
                  return (
                    <div className="search-item" key={index}>
                      {val.image ? (
                        <img
                          src={val.image}
                          alt=""
                          className="search-item-image"
                        ></img>
                      ) : (
                        ""
                      )}
                      <div
                        className="search-details"
                        onClick={() => {
                          handleRouting(val);
                        }}
                      >
                        <h6 className="search-product-name">
                          {val.productName}
                        </h6>
                        <p className="search-product-price">
                          {val.unit} {val.unitValue} - ₹ {val.price}
                        </p>
                      </div>
                      <div className="cart-button">
                        {cartData.find((item) => item._id === val._id) !==
                          undefined &&
                        cartData.find((item) => item._id === val._id).quantity >
                          0 ? (
                          <button onClick={() => Remove(val)}>-</button>
                        ) : (
                          ""
                        )}
                        {cartData.find((item) => item._id === val._id) !==
                          undefined &&
                        cartData.find((item) => item._id === val._id).quantity >
                          0 ? (
                          <h5>
                            {
                              cartData.find((item) => item._id === val._id)
                                .quantity
                            }
                          </h5>
                        ) : (
                          ""
                        )}
                        <button onClick={() => Add(val)}>+</button>
                      </div>
                    </div>
                  );
                })}
          </div>
        )}
      </div>
      <div className="navbar_left">
        <div className="navbar_left_desktop">
          <div className="navbar-cart-button">
            <div onClick={()=>handleNavigate()} className="navbar-cart">
              <FaShoppingCart size={30} />
            </div>
          </div>
          <div className="profile" onClick={() => handleDropProfile()}>
            <MdAccountCircle size={30} />
          </div>
        </div>
        <div className="navbar_left_mobile">
          <div className="navbar-cart-button">
            <Link to={"/checkout"} className="navbar-cart">
              <FaShoppingCart size={20} />
            </Link>
          </div>
          <div className="profile" onClick={() => handleDropProfile()}>
            <MdAccountCircle size={20} />
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={()=>setOpen(false)}
        message="Cart is Empty"
        anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
        key={"bottom" + "center"}
      />
    </div>
  );
};

export default Navbar;
