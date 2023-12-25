import axios from "axios";
import { LOGINAPI, VERIFYOTP } from "../utils/api";
import { getUserId } from "../utils/storage";
import { BASE_AUTH } from "../utils/base_auth";

export function loginService(mobile) {
    return axios.post(LOGINAPI, { mobile: mobile }, {
        headers: {
            Authorization: BASE_AUTH,
            "Content-Type": "application/json"
        }
    })
}

export function verifyOtpService(otp) {
    return axios.post(VERIFYOTP, { _id: getUserId(), otp: otp, type: 1 }, {
        headers: {
            Authorization: BASE_AUTH,
            "Content-Type": "application/json"
        }
    })
}