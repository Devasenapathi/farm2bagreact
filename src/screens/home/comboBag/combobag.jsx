import React, { useEffect, useState, useCallback } from 'react';
import { getCart, getProductList } from '../../../utils/storage';
import { AddCart, RemoveCart } from '../../../services/cart_service';
import { useNavigate } from 'react-router-dom';
import './combobag.css';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Combobag = ({ location }) => {
  const navigate = useNavigate();
  const [farmItem, setFarmItem] = useState([]);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    setCartData(getCart());
    setFarmItem(
      getProductList()?.filter((data) => data && data.productType === "ComboBag") || []
    );
  }, [location]);

  const addProduct = useCallback((data) => {
    if (AddCart(data)) {
      setCartData(getCart());
    }else{
      toast.error("Maximum quantity added to cart")
    }
  }, []);

  const removeProduct = useCallback((data) => {
    if (RemoveCart(data)) {
      setCartData(getCart());
    }
  }, []);

  const handleRoute = useCallback((data) => {
    navigate(`/product/${data._id}`);
  }, [navigate]);

  const cartItemCount = useCallback((id) => {
    const item = cartData.find((item) => item._id === id);
    return item ? item.quantity : 0;
  }, [cartData]);

  return (
    farmItem.length > 0 && (
      <div className="combo-container">
        <ToastContainer/>
        <h3>ComboBag</h3>
        <div className="combo-content">
          {farmItem.map((val) => (
            <div className="combo-item" key={val._id}>
              {val.image && (
                <img
                  src={val.image}
                  alt={val.productName}
                  className="combo-item-image"
                  onClick={() => handleRoute(val)}
                />
              )}
              <div className="combo-details" onClick={() => handleRoute(val)}>
                <h6 className="combo-product-name">{val.productName}</h6>
                <p className="combo-product-price">₹{val.price}</p>
              </div>
              <div className="cart-button">
                {cartItemCount(val._id) > 0 && (
                  <>
                    <button onClick={() => removeProduct(val)}>-</button>
                    <h5>{cartItemCount(val._id)}</h5>
                  </>
                )}
                <button onClick={() => addProduct(val)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Combobag;
