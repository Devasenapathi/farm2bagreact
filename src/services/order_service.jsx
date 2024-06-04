import axios from "axios";
import { ORDER_LISTAPI, RAZORPAYWEBHOOKSAPI, SAVEORDERAPI, UPDATEORDERSAVEDAPI } from "../utils/api";
import { BASE_AUTH } from "../utils/base_auth";
import { getToken } from "../utils/storage";

export function orderSaveService(data) {
  return axios.post(SAVEORDERAPI, data, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token: getToken(),
    },
  });
}

export function updateOrderStatusService(data) {
  return axios.post(UPDATEORDERSAVEDAPI, data, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token: getToken(),
    },
  });
}

export function orderListService() {
  return axios.get(ORDER_LISTAPI, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token: getToken(),
    },
  });
}

export function razorpayWebhooks(data){
  return axios.post(RAZORPAYWEBHOOKSAPI,data
  //   ,{
  //   headers: {
  //     Authorization: BASE_AUTH,
  //     "Content-Type": "application/json",
  //     Token: getToken(),
  //   },
  // }
)
}
