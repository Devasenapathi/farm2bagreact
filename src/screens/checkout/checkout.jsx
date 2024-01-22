import React, { useEffect, useState } from "react";
import {
  getCart,
  getLocationDetails,
  getUserDetails,
  getUserId,
} from "../../utils/storage";
import { IoIosCloseCircleOutline, IoIosAddCircleOutline } from "react-icons/io";
import { AddCart, RemoveCart } from "../../services/cart_service";
import { CustomerAddressService } from "../../services/customer_service";
import "./checkout.css";
  
const Checkout = () => {
  const [cartItem, setCartItem] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [addressVisible, setAddressVisible] = useState(false);
  // const [addAddressVisible, setAddAddressVisible] = useState(false);
  const [subTotal, setSubTotal] = useState();
  const [deliveryAmount, setDeliveryAmount] = useState(30);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState();
  useEffect(() => {
    handleSubTotal();
    setCartItem(getCart().filter((val) => val.quantity > 0));
    CustomerAddressService(getUserId())
      .then((res) => {
        if (res.status === 200) {
          setSelectedAddress(res.data.result.addressDetails[0]);
          setAddressList(res.data.result.addressDetails);
        } else {
          console.log("error in else of address list");
        }
      })
      .catch((err) => console.log(err, "error got"));
  }, []);

  const handleSubTotal = () => {
    setSubTotal(
      getCart()
        .filter((val) => val.quantity > 0)
        .reduce((acc, val) => {
          return acc + val.price * val.quantity;
        }, 0)
    );
  };

  useEffect(() => {
    setTotal(subTotal + discount + deliveryAmount);
  }, [subTotal, discount, deliveryAmount]);

  const handleAddress = (data) => {
    setSelectedAddress(data);
    setAddressVisible(false);
  };

  // useEffect(()=>{handleSubTotal},[cartItem])

  const Add = (data) => {
    const value = AddCart(data);
    if (value) {
      setCartItem(getCart());
      handleSubTotal();
    }
  };
  const Remove = (data) => {
    const value = RemoveCart(data);
    if (value) {
      setCartItem(getCart());
      handleSubTotal();
    }
  };

  const saveOrder = () => {
    const orderDetails = {
      customerId: getUserId(),
      customerName: getUserDetails().customerName,
      mobile: getUserDetails().mobile,
      farmId: getLocationDetails()._id,
      farmName: getLocationDetails().farmName,
      farmCircleId: getLocationDetails().farmCircleId,
      itemQuantity: getCart().length,
      orderAmount: total,
      discountType: discount,
      deliveryAddress: selectedAddress.fullAddress,
      deliveryAmount: deliveryAmount,
      gstAmount: 0,
      netAmount: total,
      paymentType: "online",
      deliveryType: "Door Delivery",
      serviceStatus: "pending",
      orderStatus: "processing",
      remarks: "remarks",
      pincode: selectedAddress.pincode,
      area: selectedAddress.area,
      orderData: getCart(),
      deviceType: "Web",
      status: 1,
    };

    // navigate('/billing')
  };
  return (
    <div className="cartScreen">
      <div className="cart-top">
        <div>
          <h3>Cart</h3>
        </div>
        <div>
          <button>Empty Cart</button>
        </div>
      </div>
      <div className="cart-bottom">
        <div className="cart-left">
          <div className="cart-left-child1">
            {cartItem &&
              cartItem.map((val) => {
                return (
                  <div className="cart-items">
                    <div className="cart-items-left">
                      <div className="cart-items-image">
                        {val.image ? (
                          <img
                            src={val.image}
                            alt=""
                            className="cart-item-image"
                          ></img>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <div className="cart-product-name">
                          <div><h5>{val.productName}</h5></div>
                          <h6>
                            {val.unit}
                            {val.unitValue}
                          </h6>
                        </div>
                        <h4>₹{val.price}</h4>
                      </div>
                    </div>
                    <div className="cart-items-right">
                      <div className="cart-button">
                        {cartItem.find((item) => item._id === val._id) !==
                          undefined &&
                        cartItem.find((item) => item._id === val._id).quantity >
                          0 ? (
                          <button onClick={() => Remove(val)}>-</button>
                        ) : (
                          ""
                        )}
                        {cartItem.find((item) => item._id === val._id) !==
                          undefined &&
                        cartItem.find((item) => item._id === val._id).quantity >
                          0 ? (
                          <h5>
                            {
                              cartItem.find((item) => item._id === val._id)
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
          {/* <div className="cart-left-child2">
            <h4>Delivery Person tip</h4>
            <p>The amount you select is for your delivery partner</p>
            <div>

            </div>
          </div> */}
        </div>
        <div className="cart-right">
          <div className="cart-coupons">
            <h5>Offers & Coupons Available</h5>
          </div>
          <div className="cart-calculation">
            <table>
              <tr>
                <td>SubTotal</td>
                <td>{subTotal}</td>
              </tr>
              <tr>
                <td>Delivery Amount</td>
                <td>{deliveryAmount}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>{discount}</td>
              </tr>
              <hr />
              <tr style={{ fontWeight: "bold", fontSize: "18px" }}>
                <td>Total</td>
                <td>{total}</td>
              </tr>
              <hr />
            </table>
          </div>
          <div className="cartAddress">
            {selectedAddress && (
              <div className="cartAddressView">
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    {selectedAddress.addressType}-
                  </span>
                  {selectedAddress.fullAddress}
                </p>
              </div>
            )}
            <button
              className="address-button"
              onClick={() => setAddressVisible(true)}
            >
              Change Address
            </button>
            <hr />
            <div className="paymentButton">
              <button>Continue to payment</button>
            </div>
          </div>
        </div>
        {addressVisible && (
          <div className="addressSelect-overlay">
            <div className="addressSelect-content">
              <div className="address-top">
                <h5>Select an address</h5>
                <h5 onClick={() => setAddressVisible(false)}>
                  <IoIosCloseCircleOutline size={20} />
                </h5>
              </div>
              <hr />
              <button className="addAddress">
                <IoIosAddCircleOutline size={30} color="red" />
                Add Address
              </button>
              <hr />
              {addressList.map((val, index) => {
                return (
                  <div
                    className="addressList"
                    key={index}
                    onClick={() => handleAddress(val)}
                  >
                    <h4>{val.addressType}</h4>
                    <p>{val.fullAddress}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* <div className="cartAddress">
        <button
          className="address-button"
          onClick={() => setAddAddressVisible(true)}
        >
          Add Address
        </button>
        <button
          className="address-button"
          onClick={() => setAddressVisible(true)}
        >
          Change Address
        </button>
        {addressVisible && (
          <div className="addressSelect-overlay">
            <div className="addressSelect-content">
              <h5 onClick={() => setAddressVisible(false)}>close</h5>
              <h3>Select the address</h3>
              {addressList.map((val, index) => {
                return (
                  <div
                    className="addressList"
                    key={index}
                    onClick={() => handleAddress(val)}
                  >
                    <h3>{val.addressType}</h3>
                    <p>{val.fullAddress}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {addAddressVisible && (
          <div className="addressSelect-overlay">
            <div className="addressSelect-content">
              <h5 onClick={() => setAddAddressVisible(false)}>close</h5>
              
            </div>
          </div>
        )}

        {selectedAddress && (
          <div>
            <h3>{selectedAddress.addressType}</h3>
            {selectedAddress.fullAddress}
          </div>
        )}
      </div>
      <div className="cart-Items">
        {cartItem.map((val, index) => {
          return (
            <div className="category-item" key={index}>
              {val.image ? (
                <img
                  src={val.image}
                  alt=""
                  className="category-item-image"
                ></img>
              ) : (
                ""
              )}
              <div className="category-details">
                <h4 className="category-product-name">{val.productName}</h4>
                <p className="category-product-price">
                  {val.unit} {val.unitValue} - ₹ {val.price}
                </p>
              </div>
              <div className="cart-button">
                {cartItem.find((item) => item._id === val._id) !== undefined &&
                cartItem.find((item) => item._id === val._id).quantity > 0 ? (
                  <button onClick={() => Remove(val)}>-</button>
                ) : (
                  ""
                )}
                {cartItem.find((item) => item._id === val._id) !== undefined &&
                cartItem.find((item) => item._id === val._id).quantity > 0 ? (
                  <h5>
                    {cartItem.find((item) => item._id === val._id).quantity}
                  </h5>
                ) : (
                  ""
                )}
                <button onClick={() => Add(val)}>+</button>
              </div>
            </div>
          );
        })}

        <div className="cart-calculation">
          <div className="cart-amount">
            <p>SubTotal</p>
            <p>{subTotal}</p>
          </div>
          <div className="cart-amount">
            <p>Delivery Amount</p>
            <p>{deliveryAmount}</p>
          </div>
          <div className="cart-amount">
            <p>Discount</p>
            <p>{discount}</p>
          </div>
          <hr />
          <div className="cart-amount">
            <p>Total</p>
            <p>{total}</p>
          </div>
          <button className="place-order" onClick={saveOrder}>
            Place Order
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Checkout;
