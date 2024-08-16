import axios from "axios";
import {
  ADDADDRESSAPI,
  CUSTOMERADDRESSAPI,
  DELETEADDRESS,
  DELETEUSERAPI,
  GETCUSTOMERAPI,
  UPDATEADDRESSAPI,
  UPDATECUSTOMERAPI,
} from "../utils/api";
import { getToken, getUserId } from "../utils/storage";
import { BASE_AUTH } from "../utils/base_auth";

export function updateCustomerService(data) {
  return axios.patch(UPDATECUSTOMERAPI, data, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token: getToken(),
    },
  });
}

export function getCustomerService() {
  return axios.get(GETCUSTOMERAPI, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token: getToken(),
    },
  });
}

export function CustomerAddressService() {
  return axios.get(CUSTOMERADDRESSAPI, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token: getToken(),
    },
  });
}
export function saveAddressService(data) {
  return axios.post(ADDADDRESSAPI, data, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token: getToken(),
    },
  });
}
export function updateAddressService(data) {
  return axios.patch(UPDATEADDRESSAPI, data, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token: getToken(),
    },
  });
}

export function customerDeleteService(data) {
  return axios.put(DELETEUSERAPI, data, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token: getToken(),
    },
  });
}

export function deleteAddress(data){
  return axios.put(DELETEADDRESS,data,{
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
      Token: getToken(),
    },
  })
}