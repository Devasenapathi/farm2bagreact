import React, { useEffect, useState, forwardRef} from "react";
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
import { BiBorderAll, BiSolidOffer } from "react-icons/bi";
import "./checkout.css";
import {
  orderSaveService,
  razorpayWebhooks,
  updateOrderStatusService,
} from "../../services/order_service";
import { useNavigate } from "react-router-dom";
import SuccessScreen from "../paymentStatus/success";
import FailedScreen from "../paymentStatus/failed";
import Login from "../login/login";
import AddAddress from "../addAddress/addAddress";
import { Box, Button, CircularProgress, Snackbar, Switch } from "@mui/material";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa'; 
import { MdDeleteOutline } from "react-icons/md";

const Checkout = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
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
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loader, setLoader] = useState(false)
  const [open, setOpen] = useState(false)
  const [instantVisible, setInstantVisible] = useState(false)
  const [instantEnabled, setInstantEnabled] = useState(false)
  const [dateVisible, setDateVisible] = useState(false)

  var date = new Date();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="custom-input" onClick={onClick} ref={ref}>
      <input value={value} readOnly />
      <FaCalendarAlt className="calendar-icon" />
    </div>
  ));

  // Calculate minimum and maximum times
  const now = new Date();
  const minTime = new Date();
  minTime.setHours(6, 45);

  const maxTime = new Date();
  maxTime.setHours(18, 0);

  useEffect(() => {
    setSelectedDate(new Date(new Date().setDate(new Date().getDate() + 1)))
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const origin = new window.google.maps.LatLng(12.9269658, 80.2221044);
          const destination = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          const service = new window.google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: [origin],
              destinations: [destination],
              travelMode: 'DRIVING',
            },
            (response, status) => {
              if (status === 'OK') {
                const distanceInMeters = response.rows[0].elements[0].distance.value;
                // Convert distance from meters to kilometers or miles as needed
                const distanceInKm = distanceInMeters / 1000;
                if (distanceInKm < 3) {
                  setDeliveryAmount(0)
                  var time = date.toLocaleTimeString();
                  if (time > '07:00:00' && time < '08:00:00') {
                    setInstantVisible(true)
                  } else {
                    setInstantVisible(false)
                  }
                }else if(distanceInKm >3 && distanceInKm <5){
                  setDeliveryAmount(10)
                }else if(distanceInKm>5 && distanceInKm <10){
                  setDeliveryAmount(20)
                }else if(distanceInKm>10 && distanceInKm <20){
                  setDeliveryAmount(30)
                }else{
                  setDeliveryAmount(45)
                }
                // setDistance(distanceInKm);
              } else {
                // Handle error
                console.error('Error:', status);
              }
            }
          );
        })
    }
    handleSubTotal();
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
          return acc + (val.offer > 0 ? Math.round(val.totalPrice - val.totalPrice * val.offer / 100) : val.totalPrice);
        }, 0)
    );
  };

  useEffect(() => {
    if (getCart().length <= 0) {
      navigate('/')
    }
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
        razorpayWebhooks({ "pay_id": response.error.metadata.payment_id }).then((result) => {
          if (result.data.result === "failed") {
            razorpayPaymentFailure();
          } else {
            setSuccess(true);
            clearCart();
            SuccessTimer();
          }
        })
          .catch((err) => {
            razorpayPaymentFailure();
          })

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
    if(total>100){
    if (selectedAddress && selectedAddress.fullAddress) {
      const address = {
        addressType: selectedAddress.addressType,
        fullAddress: selectedAddress.fullAddress,
        address: selectedAddress.fullAddress,
        doorNo: selectedAddress.doorNo,
        landmark: selectedAddress.landmark,
        latitude: selectedAddress.latitude,
        longitude: selectedAddress.longitude,
        pincode: selectedAddress.latitude,
        area: selectedAddress.area,
      }
      const cartData = getCart().map((element) => ({
        perRate: 0,
        quantity: element.quantity,
        price: element.price,
        totalAmount: element.totalPrice,
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
        deliveryAddress: address,
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
        status: instantEnabled ? 2 : 1,
        expDeliveryDateAndTime:selectedDate,
      };

      orderSaveService(orderDetails)
        .then((res) => {
          if (res.status === 200) {
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
                  razorpayPaymentFailure()
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
    } else {
      setLoader(false)
      setOpen(true)
      setError("Select Address!")
    }
  }else{
    setLoader(false)
    setOpen(true)
    setError("Minimum order amount above 100")
  }
  };

  const SuccessTimer = () => {
    setTimeout(() => {
      setSuccess(false);
      navigate("/");
    }, 2000);
  };

  const handleCart = () => {
    clearCart()
    setCartItem([])
    navigate('/')
  }

  const instantDelivery = () => {
    setInstantEnabled(!instantEnabled)
    if (!instantEnabled) {
      setDeliveryAmount(deliveryAmount + 15)
    } else (
      setDeliveryAmount(deliveryAmount - 15)
    )
  }

  return (
    <div className="cartScreen">
      {loginVisible && <Login handleClose={() => setLoginVisible(false)} />}
      {success && <SuccessScreen />}
      {failed && <FailedScreen />}
      <div className="cart-top">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <IoMdArrowRoundBack size={30} onClick={() => navigate(-1)} />
          <h3>Cart</h3>
        </div>
        <div>
          <Button onClick={() => handleCart()}>Empty Cart</Button>
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
                            {val.unitValue} - 
                            ₹{val.offer > 0 ? Math.round(val.totalPrice - val.totalPrice * val.offer / 100) : val.totalPrice}
                          </h6>
                        </div>
                        
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
                      <Button color="error"><MdDeleteOutline size={30} color="error"/></Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="cart-right">
          <div className="dateTime">
            <h3>Customize Date and Time of Delivery</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => handleDateChange(date)}
              showTimeSelect
              timeIntervals={15}
              dateFormat="dd/MM/yyyy hh:mm aa"
              minDate={new Date(now.setDate(now.getDate() + 1))}
              maxDate={new Date(now.setDate(now.getDate() + 5))}
              minTime={minTime}
              maxTime={maxTime}
              className="custom-datepicker"
              customInput={<CustomInput />}
            />
          </div>

          <div className="cart-coupons">
            <BiSolidOffer size={30} color="green" />
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
            {selectedAddress && selectedAddress.fullAddress && (
              <div className="cartAddressView">
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    {selectedAddress.addressType}-
                  </span>
                  {selectedAddress.fullAddress}
                </p>
              </div>
            )}
            <Button
              color="success"
              className="address-button"
              onClick={() => setAddressVisible(true)}
            >
              {selectedAddress && selectedAddress.fullAddress ? "Change Address" : "Select Address"}
            </Button>
            {instantVisible && <div className="instant">
              <div className="instant1">
                <h4>Instant Delivery</h4>
                <h6>Get your order within 30 mins</h6>
              </div>
              <Switch onChange={() => instantDelivery()} color="secondary" />
            </div>}
            <hr />
            <div className="paymentButton" >
              {/* <RazorpayButton/> */}
              {loader ? <CircularProgress color="inherit" size={25} /> : <Button variant="contained" color="success" onClick={saveOrder}>Continue to payment</Button>}
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
                {addressList.slice().reverse().map((val, index) => {
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
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message={error}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        key={"bottom" + "center"}
      />
    </div>
  );
};

export default Checkout;
