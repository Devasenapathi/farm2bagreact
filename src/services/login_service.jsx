import axios from "axios";
import { LOGINAPI, RESENDOTP, SIGNUPAPI, VERIFYOTP } from "../utils/api";
import { getUserId } from "../utils/storage";
import { BASE_AUTH } from "../utils/base_auth";

export function loginService(mobile) {
  return axios.post(
    LOGINAPI,
    { mobile: mobile },
    {
      headers: {
        Authorization: BASE_AUTH,
        "Content-Type": "application/json",
      },
    }
  );
}

export function verifyOtpService(otp) {
  return axios.post(
    VERIFYOTP,
    { _id: getUserId(), otp: otp.otp, type: otp.type },
    {
      headers: {
        Authorization: BASE_AUTH,
        "Content-Type": "application/json",
      },
    }
  );
}

export function signupService(data) {
  return axios.post(SIGNUPAPI, data, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
    },
  });
}

export function resentOtpService(data) {
  return axios.post(RESENDOTP, data, {
    headers: {
      Authorization: BASE_AUTH,
      "Content-Type": "application/json",
    },
  })
}