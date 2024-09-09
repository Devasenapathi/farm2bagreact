export function setToken(data) {
    localStorage.setItem('token', 'Bearer '+data)
}

export function getToken() {
    return localStorage.getItem('token')
}

export function setUserId(data) {
    localStorage.setItem('userId', data)
}

export function getUserId() {
    return localStorage.getItem('userId')
}

export function setUserDetails(data) {
    localStorage.setItem('userDetails', JSON.stringify(data))
}

export function getUserDetails() {
    return JSON.parse(localStorage.getItem('userDetails'))
}

export function setLocationDetails(data) {
    localStorage.setItem('location', JSON.stringify(data))
}

export function getLocationDetails() {
    const storedValue = localStorage.getItem('location')
    return storedValue ? JSON.parse(storedValue) : []
}

export function setProductList(data){
    localStorage.setItem('productList',JSON.stringify(data))
}

export function getProductList(){
    return JSON.parse(localStorage.getItem('productList'))
}

export function setCart(data) {
    localStorage.setItem('cart', JSON.stringify(data))
}

export function getCart() {
    const storedValue = localStorage.getItem('cart')
    return storedValue ? JSON.parse(storedValue) : []
}

export function clearCart() {
    localStorage.removeItem('cart')
}

export function Logout(){
    localStorage.clear()
}

export const LocationData = {
    lat: getLocationDetails() ? getLocationDetails().lattitude : "",
    lng: getLocationDetails() ? getLocationDetails().longitude : "",
    pincode: getLocationDetails() ? getLocationDetails().pincode : "",
  };