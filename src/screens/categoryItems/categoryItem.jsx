import React, { useEffect, useState } from "react";
import { categoryService } from "../../services/b2c_service";
import { getCart, getProductList } from "../../utils/storage";
import { AddCart, RemoveCart } from "../../services/cart_service";
import "./categoryItem.css";
import CartButton from "../cart/cart_button";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const CategoryItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [farmItem, setFarmItem] = useState([]);
  const [cartData, setCartData] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    setSelectedCategory(location.state);
    categoryService()
      .then((res) => {
        if (res.status === 201) {
          setCategory(res.data.result);
        } else {
          console.log("Error in Category loading");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setCartData(getCart());
    setFarmItem(
      selectedCategory
        ? getProductList().filter(
          (data) => data.productCategoryId._id === selectedCategory._id
        )
        : getProductList().filter(
          (data) => data.productCategoryId._id === location.state._id
        )
    );
  }, [selectedCategory]);

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
    navigate(`/product/${data._id}`, { state: data });
  };
  return (
    <div>
      <div className="category-main">
        {category.map((val, index) => {
          return (
            <div
              className="category-type"
              style={{
                backgroundColor:
                  selectedCategory._id === val._id ? "#F4C430" : "",
              }}
              onClick={() => {
                setSelectedCategory(val);
              }}
              key={index}
            >
              {val.categoryName}
            </div>
          );
        })}
      </div>
      {farmItem && (
        <div>
          <div className="category-container">
            {selectedCategory && <h3><IoMdArrowRoundBack size={30} onClick={() => navigate(-1)} />{selectedCategory.categoryName}</h3>}
            <div className="category-content">
              {farmItem.map((val, index) => {
                return (
                  <div className="category-item" key={index}>
                    {val.image ? (
                      <img
                        src={val.image}
                        alt=""
                        className="category-item-image"
                        onClick={() => {
                          handleRouting(val);
                        }}
                      ></img>
                    ) : (
                      ""
                    )}
                    <div
                      className="category-details"
                      onClick={() => {
                        handleRouting(val);
                      }}
                    >
                      <h4 className="category-product-name">
                        {val.productName}
                      </h4>
                      <p className="daily-product-price">
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
            <CartButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
