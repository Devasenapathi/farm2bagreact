import React, { useEffect, useState } from "react";
import {
  clearCart,
  getCart,
  getLocationDetails,
  getUserDetails,
  getUserId,
} from "../../utils/storage";
import { IoIosCloseCircleOutline, IoIosAddCircleOutline } from "react-icons/io";
import { AddCart, RemoveCart } from "../../services/cart_service";
import { CustomerAddressService } from "../../services/customer_service";
import { BiSolidOffer } from "react-icons/bi";
import "./checkout.css";
import {
  orderSaveService,
  updateOrderStatusService,
} from "../../services/order_service";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const navigate = useLocation();
  const [cartItem, setCartItem] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [addressVisible, setAddressVisible] = useState(false);
  // const [addAddressVisible, setAddAddressVisible] = useState(false);
  const [subTotal, setSubTotal] = useState();
  const [deliveryAmount, setDeliveryAmount] = useState(0);
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
      razorpay.on('payment.failed', function(response){razorpayPaymentFailure(response)})
    };
    document.body.appendChild(script);
  };

  const initiateRazorpay = (data) => {
    initializeRazorpay(data);
  };

  const razorpayPaymentFailure=()=>{
    alert("payment failed")
  }

  const saveOrder = () => {
    console.log(getCart(), "getCart");
    const cartData = getCart().map((element) => ({
      ...element,
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
      orderAmount: 1,
      discountType: discount,
      deliveryAddress: selectedAddress.fullAddress,
      deliveryAmount: deliveryAmount,
      gstAmount: 0,
      netAmount: 1,
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
            key: "rzp_test_tX0j8ZDLLFTiM9", // Enter the Key ID generated from the Dashboard
            amount: res.data.result.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Farm2bag",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: res.data.result.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
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
                  .then((res) =>
                    console.log(res, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                  )
                  .catch((err) => console.log(err, "sssssssssssssssssssssss"));
              } else {
                console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
              }
            },
            prefill: {
              name: "Gaurav Kumar",
              email: "gaurav.kumar@example.com",
              contact: "9000090000",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };

          initiateRazorpay(options);
        }
      })
      .catch((err) => {
        console.log(err, "error in order saving");
      });
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
          <div className="cart-coupons">
            <BiSolidOffer size={30} color="blue" />
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
              {/* <RazorpayButton/> */}
              <button onClick={saveOrder}>Continue to payment</button>
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
    </div>
  );
};

export default Checkout;
