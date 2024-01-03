import axios from "axios";
import { SAVEORDERAPI } from "../utils/api";

export function orderSaveService(data) {
    return axios.post(SAVEORDERAPI, data, {
        headers: {
            Authorization: BASE_AUTH,
            "Content-Type": "application/json",
            Token: getToken(),
        }
    })
}