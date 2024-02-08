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

const Navbar = ({ location, locationChanged, handleOpen }) => {
  const navigate = useNavigate();
  const [loginVisible, setLoginVisible] = useState(false);
  const [farmItem, setFarmItem] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [productName, setProductName] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
    navigate("/profile");
  };

  const handleLogout = () => {
    Logout();
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
      <h4 onClick={handleOpen}>{location}</h4>
      <input
        type="text"
        className="navbar_search_text"
        value={productName}
        name="search"
        placeholder="Search"
        onChange={(e) => setProductName(e.target.value)}
      ></input>
      <div className="navbar_left">
        <div className="navbar_left_desktop">
          <div className="navbar-cart-button">
            <Link to={"/checkout"} className="navbar-cart">
              <FaShoppingCart size={30} />
            </Link>
            <div className="navbar-cart-value">{getCart().length}</div>
          </div>
          {getToken() == null || undefined ? (
            <h4 onClick={() => setLoginVisible(!loginVisible)}>Login</h4>
          ) : (
            <div className="profile" onClick={() => handleDropProfile()}>
              <MdAccountCircle size={30} />
              {/* {dropdownVisible && (
              <div className="dropdown">
                <Link to={"/profile"}>
                  <div className="dropdown-item">
                    <MdAccountCircle />
                    Profile
                  </div>
                </Link>
                <Link to={"/orders"}>
                  <div className="dropdown-item">
                    <FaShoppingCart /> Orders
                  </div>
                </Link>
                <div className="dropdown-item" onClick={handleLogout}>
                  <CiLogout /> Logout
                </div>
              </div>
            )} */}
            </div>
          )}
        </div>
        <div className="navbar_left_mobile">
          {/* <FaSearch size={20} /> */}
          <div className="navbar-cart-button">
            <Link to={"/checkout"} className="navbar-cart">
              <FaShoppingCart size={20} />
            </Link>
            <div className="navbar-cart-value">{getCart().length}</div>
          </div>
          <div className="profile" onClick={() => handleDropProfile()}>
            <MdAccountCircle size={20} />
            {dropdownVisible && (
              <div className="dropdown">
                <Link to={"/profile"}>
                  <div className="dropdown-item">
                    <MdAccountCircle />
                    Profile
                  </div>
                </Link>
                <Link to={"/orders"}>
                  <div className="dropdown-item">
                    <FaShoppingCart /> Orders
                  </div>
                </Link>
                <div className="dropdown-item" onClick={handleLogout}>
                  <CiLogout /> Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
