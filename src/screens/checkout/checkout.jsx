import React, { useEffect, useState } from "react";
import {
  clearCart,
  getCart,
  getLocationDetails,
  getToken,
  getUserDetails,
  getUserId,
} from "../../utils/storage";
import { IoIosCloseCircleOutline, IoIosAddCircleOutline, IoMdArrowRoundBack } from "react-icons/io";
import { AddCart, RemoveCart } from "../../services/cart_service";
import { CustomerAddressService } from "../../services/customer_service";
import { BiSolidOffer } from "react-icons/bi";
import "./checkout.css";
import {
  orderSaveService,
  updateOrderStatusService,
} from "../../services/order_service";
import { useNavigate } from "react-router-dom";
import SuccessScreen from "../paymentStatus/success";
import FailedScreen from "../paymentStatus/failed";
import Login from "../login/login";
import AddAddress from "../addAddress/addAddress";
import { Box, CircularProgress } from "@mui/material";

const Checkout = () => {
  const navigate = useNavigate();
  const [loginVisible, setLoginVisible] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [addressVisible, setAddressVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  // const [addAddressVisible, setAddAddressVisible] = useState(false);
  const [subTotal, setSubTotal] = useState();
  const [deliveryAmount, setDeliveryAmount] = useState(30);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState();
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    handleSubTotal();
    if (getToken() === null || undefined) {
      setLoginVisible(true);
    }
    setCartItem(getCart().filter((val) => val.quantity > 0));
  }, []);

  useEffect(() => {
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
  }, [addVisible, loginVisible]);

  const handleSubTotal = () => {
    setSubTotal(
      getCart()
        .filter((val) => val.quantity > 0)
        .reduce((acc, val) => {
          return acc + val.price;
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

  const initializeRazorpay = (option) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      const razorpay = new window.Razorpay(option);
      razorpay.open();
      razorpay.on("payment.failed", function (response) {
        razorpay.close();
        razorpayPaymentFailure();
      });
    };
    document.body.appendChild(script);
  };

  const initiateRazorpay = (data) => {
    initializeRazorpay(data);
  };

  const razorpayPaymentFailure = () => {
    setFailed(true);
    setTimeout(() => {
      setFailed(false);
    }, 5000);
  };

  const saveOrder = () => {
    setLoader(true)
    const cartData = getCart().map((element) => ({
      perRate: 0,
      quantity: element.quantity,
      price: element.actualPrice,
      totalAmount: element.price,
      productName: element.productName,
      unit: element.unit,
      unitValue: element.unitValue,
      farmProductId: element._id,
      productCategoryId: element.productCategoryId._id,
    }));
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
      paymentType: "Online",
      deliveryType: "Door Delivery",
      serviceStatus: "pending",
      orderStatus: "processing",
      remarks: "remarks",
      pincode: selectedAddress.pincode,
      area: selectedAddress.area,
      orderData: cartData,
      deviceType: "Web",
      status: 1,
    };

    orderSaveService(orderDetails)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.result);
          var options = {
            key: "rzp_live_12DDyorrzl797Z",
            amount: res.data.result.amount,
            currency: "INR",
            name: "Farm2bag",
            description: "Buy Organic products",
            image: "https://example.com/your_logo",
            order_id: res.data.result.order_id,
            handler: function (response) {
              if (response) {
                const details = {
                  orderId: res.data.result.id,
                  razorpay_order_id: response.razorpay_order_idd,
                  razorpay_payment_id: response.razorpay_payment_id,
                  paymentStatus: "success",
                  orderStatus: "pending",
                  razorpay_payment_message: "Payment Successfully",
                };
                updateOrderStatusService(details)
                  .then((res) => {
                    if (res.status === 200) {
                      setSuccess(true);
                      clearCart();
                      SuccessTimer();
                    }
                  })
                  .catch((err) => console.log(err));
              } else {
                console.log("eee");
              }
            },
            prefill: {
              name: getUserDetails().customerName,
              email: getUserDetails().email,
              contact: getUserDetails().mobile,
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };

          initiateRazorpay(options);
          setLoader(false)
        }
      })
      .catch((err) => {
        console.log(err, "error in order saving");
      });
  };

  const SuccessTimer = () => {
    setTimeout(() => {
      setSuccess(false);
      navigate("/");
    }, 2000);
  };

  const handleCart = () =>{
    clearCart()
    setCartItem([])
    navigate('/')
  }

  return (
    <div className="cartScreen">
      {loginVisible && <Login handleClose={() => setLoginVisible(false)} />}
      {success && <SuccessScreen />}
      {failed && <FailedScreen />}
      <div className="cart-top">
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <IoMdArrowRoundBack size={30} onClick={()=>navigate(-1)}/>
          <h3>Cart</h3>
        </div>
        <div>
          <button onClick={()=>handleCart()}>Empty Cart</button>
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
                          <div>
                            <h5>{val.productName}</h5>
                          </div>
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
          {/* <div className="cart-coupons">
            <BiSolidOffer size={30} color="blue" />
            <h5>Offers & Coupons Available</h5>
          </div> */}
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
            <div className="paymentButton" >
              {/* <RazorpayButton/> */}
              {loader ? <CircularProgress color="inherit" size={25} /> : <button onClick={saveOrder}>Continue to payment</button>}
            </div>
          </div>
        </div>
        {addressVisible && (
          <div className="addressSelect-overlay">
            {addVisible && (
              <AddAddress handleClose={() => setAddVisible(false)} />
            )}
            <div className="addressSelect-content">
              <div className="address-top">
                <h5>Select an address</h5>
                <h5 onClick={() => setAddressVisible(false)}>
                  <IoIosCloseCircleOutline size={20} />
                </h5>
              </div>
              <hr />
              <button
                className="addAddress"
                onClick={() => setAddVisible(true)}
              >
                <IoIosAddCircleOutline size={30} color="red" />
                Add Address
              </button>
              <hr />
              <div className="addressbox">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
