export function setToken(data) {
    sessionStorage.setItem('token', data)
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

export function setLocationDetails(data) {
    sessionStorage.setItem('location', JSON.stringify(data))
}

export function getLocationDetails() {
    const storedValue = sessionStorage.getItem('location')
    return storedValue ? JSON.parse(storedValue) : []
}

export function setCart(data){
    sessionStorage.setItem('cart',JSON.stringify(data))
}

export function getCart(){
   const storedValue = sessionStorage.getItem('cart')
   return storedValue? JSON.parse(storedValue):[]
}