// const BASE_URL = "https://f2b.farm2bag.com/api/v1/";
const BASE_URL = "http://192.168.1.12:3000/api/v1/";
// login
export const LOGINAPI = BASE_URL + "login/customer-login";
export const VERIFYOTP = BASE_URL + "login/verify-otp-customer";
//b2c
export const FARMSAPI = BASE_URL + "b2c/farms";
export const CATEGORYAPI = BASE_URL + "b2c/category";
export const BANNERAPI = BASE_URL + "b2c/banner";
export const FARMITEMAPI = BASE_URL + "b2c/item";
export const DELIVERYAMOUNTAPI = BASE_URL + "b2c/deliveryAmount";

//customer
export const SIGNUPAPI = BASE_URL + "customer/signup";
export const UPDATECUSTOMERAPI = BASE_URL + "customer/customer-update";
export const GETCUSTOMERAPI = BASE_URL + "customer/getDetails";
export const CUSTOMERADDRESSAPI = BASE_URL + "customer/getAll-address";
export const UPDATEADDRESSAPI = BASE_URL + "customer/update-address";
export const ADDADDRESSAPI = BASE_URL + "customer/save-address";
export const DELETEUSERAPI = BASE_URL + "customer/delete";


//order
export const SAVEORDERAPI = BASE_URL + "order/save";
export const UPDATEORDERSAVEDAPI = BASE_URL + "order/updateOrderStatus";
export const ORDER_LISTAPI = BASE_URL + "order/getCustomer";