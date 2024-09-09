import React, { useEffect, useState } from "react";
import { getCart, getProductList } from "../../../utils/storage";
import { AddCart, RemoveCart } from "../../../services/cart_service";
import { useNavigate } from "react-router-dom";
import CartButton from "../../cart/cart_button";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DailyFresh = ({ location }) => {
  const navigate = useNavigate();
  const [farmItem, setFarmItem] = useState([]);
  const [cartData, setCartData] = useState();
  useEffect(() => {
    setCartData(getCart());
    setFarmItem(
      getProductList()
        ? getProductList().filter((data) => data.dailyFresh === true)
        : []
    );
  }, [location]);

  const Add = (data) => {
    const value = AddCart(data);
    if (value) {
      setCartData(getCart());
    }else{
      toast.error("Maximum quantity added to cart")
    }
  };
  const Remove = (data) => {
    const value = RemoveCart(data);
    if (value) {
      setCartData(getCart());
    }
  };

  const handleRouting = (data) => {
    navigate(`/product/${data._id}`, { state: data });
  };

  return (
    <div>
      <ToastContainer/>
      {farmItem && (
        <div className="product-main">
          <h3>Daily Fresh</h3>
          <div className="product-content">
            {farmItem.map((val, index) => {
              return (
                <div className="product-items">
                  <div className="product-item" key={index}>
                    {val.image ? (
                      <img
                        src={val.image}
                        alt=""
                        className="product-item-image"
                        onClick={() => {
                          handleRouting(val);
                        }}
                      ></img>
                    ) : (
                      ""
                    )}
                    <div className="product-details">
                      <h4 className="product-name" onClick={() => {
                          handleRouting(val);
                        }}>{val.productName}</h4>
                      <p className="product-price">
                        {val.unit} {val.unitValue} - ₹ {val.offer>0?Math.round(val.price - val.price*val.offer/100):val.price}
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
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyFresh;
