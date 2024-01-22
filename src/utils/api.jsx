const BASE_URL = 'http://192.168.1.20:8000/api/v1/'
// login
export const LOGINAPI = BASE_URL + "login/customer-login"
export const VERIFYOTP = BASE_URL + "login/verify-otp-customer"
//b2c
export const FARMSAPI = BASE_URL + "b2c/farms"
export const CATEGORYAPI = BASE_URL+"b2c/category"
export const BANNERAPI = BASE_URL + "b2c/banner"
export const FARMITEMAPI = BASE_URL + "b2c/item"
export const DELIVERYAMOUNTAPI = BASE_URL + "b2c/deliveryAmount"

//customer
export const CUSTOMERADDRESSAPI = BASE_URL +'customer/getAll-address'

//order
export const SAVEORDERAPI = BASE_URL + 'order/save'