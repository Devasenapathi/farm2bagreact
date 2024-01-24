import axios from "axios";
import { SAVEORDERAPI, UPDATEORDERSAVEDAPI } from "../utils/api";
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
