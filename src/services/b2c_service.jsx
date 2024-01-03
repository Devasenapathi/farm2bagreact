import axios from "axios";
import { CATEGORYAPI, DELIVERYAMOUNTAPI, FARMITEMAPI, FARMSAPI } from "../utils/api";
import { BASE_AUTH } from "../utils/base_auth";
import { getToken } from "../utils/storage";

export function categoryService() {
    return axios.get(CATEGORYAPI, {
        headers: {
            Authorization: BASE_AUTH,
            "Content-Type": "application/json"
        }
    })
}

export function farmsService() {
    return axios.get(FARMSAPI, {
        headers: {
            Authorization: BASE_AUTH,
            "Content-Type": "application/json"
        }
    })
}

export function farmItemService(data) {
    return axios.post(FARMITEMAPI, data, {
        headers: {
            Authorization: BASE_AUTH,
            "Content-Type": "application/json"
        }
    })
}

export function deliveryAmountSerice(data) {
    return axios.post(DELIVERYAMOUNTAPI,data, {
        headers: {
            Authorization: BASE_AUTH,
            "Content-Type": "application/json",
            Token: getToken()
        }
    })
}