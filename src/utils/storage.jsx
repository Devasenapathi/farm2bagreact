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






// async function generateKey() {
//     return await crypto.subtle.generateKey(
//       {
//         name: "AES-GCM",
//         length: 256,
//       },
//       true,
//       ["encrypt", "decrypt"]
//     );
//   }
  
//   async function encryptJson(key, jsonData) {
//     const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate a random IV
//     const encoded = new TextEncoder().encode(JSON.stringify(jsonData));
  
//     const encrypted = await crypto.subtle.encrypt(
//       {
//         name: "AES-GCM",
//         iv: iv,
//       },
//       key,
//       encoded
//     );
  
//     return {
//       iv: Array.from(iv),
//       data: Array.from(new Uint8Array(encrypted))
//     };
//   }
  
//   async function decryptJson(key, encryptedData) {
//     const iv = new Uint8Array(encryptedData.iv);
//     const data = new Uint8Array(encryptedData.data);
  
//     const decrypted = await crypto.subtle.decrypt(
//       {
//         name: "AES-GCM",
//         iv: iv,
//       },
//       key,
//       data
//     );
  
//     const decoded = new TextDecoder().decode(decrypted);
//     return JSON.parse(decoded);
//   }
  
//   // Example usage
//   (async () => {
//     const key = await generateKey();
//     const jsonData = { name: "Alice", age: 25 };
  
//     const encryptedData = await encryptJson(key, jsonData);
//     console.log("Encrypted data:", encryptedData);
  
//     const decryptedData = await decryptJson(key, encryptedData);
//     console.log("Decrypted data:", decryptedData);
//   })();
  