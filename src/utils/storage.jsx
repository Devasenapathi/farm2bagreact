export function setToken(data) {
    sessionStorage.setItem('token', 'Bearer '+data)
}

export function getToken() {
    return sessionStorage.getItem('token')
}

export function setUserId(data) {
    sessionStorage.setItem('userId', data)
}

export function getUserId() {
    return sessionStorage.getItem('userId')
}

export function setUserDetails(data) {
    sessionStorage.setItem('userDetails', JSON.stringify(data))
}

export function getUserDetails() {
    return JSON.parse(sessionStorage.getItem('userDetails'))
}

export function setLocationDetails(data) {
    sessionStorage.setItem('location', JSON.stringify(data))
}

export function getLocationDetails() {
    const storedValue = sessionStorage.getItem('location')
    return storedValue ? JSON.parse(storedValue) : []
}

export function setProductList(data){
    sessionStorage.setItem('productList',JSON.stringify(data))
}

export function getProductList(){
    return JSON.parse(sessionStorage.getItem('productList'))
}

export function setCart(data) {
    sessionStorage.setItem('cart', JSON.stringify(data))
}

export function getCart() {
    const storedValue = sessionStorage.getItem('cart')
    return storedValue ? JSON.parse(storedValue) : []
}

export function clearCart() {
    sessionStorage.removeItem('cart')
}

export function Logout(){
    localStorage.clear()
    sessionStorage.clear()
}