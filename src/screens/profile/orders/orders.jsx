import React, { useEffect, useState } from "react";
import { orderListService } from "../../../services/order_service";
import { getUserId } from "../../../utils/storage";
import "./orders.css";

const Orders = () => {
  const [ordersList, setOrdersList] = useState([]);
  useEffect(() => {
    orderListService(getUserId())
      .then((res) => {
        setOrdersList(res.data.result);
        // if (res.statusCode === 200) {
        //     console.log("hello world")
        // }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="orders">
      {ordersList.map((value, index) => {
        return (
          <div className="ordersList" key={index}>
            {/* <h1>{index+1}</h1> */}
            <div className="orderListSub">
              <h4>#{value.orderId}</h4>
              {/* {value.orderStatus==='delivered'&&<button onClick={()=>handleReorder(value)}>Re-order</button>} */}
            </div>
            <div className="orderListSub">
              <h4>Date</h4>
              <p>{value.orderDate}</p>
            </div>
            <div className="orderListSub">
              <h4>Order Quantity</h4>
              <p>{value.itemQuantity}</p>
            </div>
            <div className="orderListSub">
              <h4>Amount</h4>
              <p>₹{value.orderAmount}</p>
            </div>
            <div className="orderListSub">
              <h4>Order Status</h4>
              <p>₹{value.orderStatus}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
