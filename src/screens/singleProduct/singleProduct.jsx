import React, { useEffect, useState } from "react";
import { getCart, getProductList } from "../../utils/storage";
import { AddCart, RemoveCart } from "../../services/cart_service";
import "./singleProduct.css";
import { useLocation } from "react-router-dom";
const SingleProduct = () => {
  const location = useLocation();
  const [farmItem, setFarmItem] = useState([]);
  const [cartData, setCartData] = useState();
  useEffect(() => {
    setCartData(getCart());
    setFarmItem(
      getProductList()
        ? getProductList().filter(
            (data) =>
              data.productCategoryId._id ===
              location.state.productCategoryId._id
          )
        : ""
    );
  }, []);

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
  return (
    <div className="singleProduct">
      <div className="singleProduct-content">
        <div className="singleProduct-image">
          {location.state.image ? (
            <img
              src={location.state.image}
              alt=""
              className="singleProduct-item-image"
            ></img>
          ) : (
            ""
          )}
        </div>
        <div className="singleProduct-cart">
          <h2>{location.state.productName}</h2>
          <p>{location.state.productTypeMasterId.productType}</p>
          <h4>
            {location.state.unit} {location.state.unitValue} - ₹
            {location.state.price}
          </h4>

          {cartData && (
            <div className="cart-button">
              {cartData.find((item) => item._id === location.state._id) !==
                undefined &&
              cartData.find((item) => item._id === location.state._id)
                .quantity > 0 ? (
                <button onClick={() => Remove(location.state)}>-</button>
              ) : (
                ""
              )}
              {cartData.find((item) => item._id === location.state._id) !==
                undefined &&
              cartData.find((item) => item._id === location.state._id)
                .quantity > 0 ? (
                <h5>
                  {
                    cartData.find((item) => item._id === location.state._id)
                      .quantity
                  }
                </h5>
              ) : (
                ""
              )}
              <button onClick={() => Add(location.state)}>+</button>
            </div>
          )}
        </div>
      </div>
      <div className="singleProduct-description">
        <h4>Description</h4>
        <p>{location.state.description}</p>
      </div>
      {farmItem && (
        <div className="product-main">
          <h3>Seasnal products</h3>
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
                          // handleRouting(val);
                        }}
                      ></img>
                    ) : (
                      ""
                    )}
                    <div className="product-details">
                      <h4 className="product-name">{val.productName}</h4>
                      <p className="product-price">
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
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default SingleProduct;
