import axios from "axios";
import { CUSTOMERADDRESSAPI } from "../utils/api";
import { getToken } from "../utils/storage";
import { BASE_AUTH } from "../utils/base_auth";

export function CustomerAddressService(data) {
    return axios.get(CUSTOMERADDRESSAPI,{
        headers: {
            Authorization: BASE_AUTH,
            "Content-Type": "application/json",
            Token:getToken(),
        }
    })
}