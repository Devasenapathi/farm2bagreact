import React, { useEffect, useState } from 'react'
import { getCart, getLocationDetails, getUserDetails, getUserId } from '../../utils/storage'
import { AddCart, RemoveCart } from '../../services/cart_service'
import { CustomerAddressService } from '../../services/customer_service'
import './checkout.css'
import { deliveryAmountSerice } from '../../services/b2c_service'
import { Link, useNavigate } from 'react-router-dom'

const Checkout = () => {
    const navigate = useNavigate()
    const [cartItem, setCartItem] = useState([])
    const [addressList, setAddressList] = useState([])
    const [selectedAddress, setSelectedAddress] = useState()
    const [addressVisible, setAddressVisible] = useState(false)
    const [subTotal, setSubTotal] = useState()
    const [deliveryAmount, setDeliveryAmount] = useState(30)
    const [discount, setDiscount] = useState(0)
    const [total, setTotal] = useState()
    useEffect(() => {
        handleSubTotal()
        setCartItem(getCart().filter((val) => val.quantity > 0))
        CustomerAddressService(getUserId()).then((res) => {
            if (res.status === 200) {
                setSelectedAddress(res.data.result.addressDetails[0])
                setAddressList(res.data.result.addressDetails)

            } else {
                console.log('error in else of address list')
            }
        }).catch((err) => console.log(err, 'error got'))
    }, [])

    const handleSubTotal = () => {
        setSubTotal(getCart().filter((val) => val.quantity > 0).reduce((acc, val) => {
            return acc + val.price *val.quantity
        }, 0))
        
    }

    useEffect(() => { setTotal(subTotal + discount + deliveryAmount) }, [subTotal, discount, deliveryAmount])

    const handleAddress = (data) => {
        setSelectedAddress(data)
        setAddressVisible(false)
    }

    // useEffect(()=>{handleSubTotal},[cartItem])

    const Add = (data) => {
        const value = AddCart(data)
        if (value) {
            setCartItem(getCart())
            handleSubTotal()
        }
    }
    const Remove = (data) => {
        const value = RemoveCart(data)
        if (value) {
            setCartItem(getCart())
            handleSubTotal()
        }
    }

    const saveOrder = () => {
        console.log(getUserDetails().customerName, 'aaaaaaaaaaaaaa')
        const orderDetails = {
            customerId: getUserId(),
            customerName: getUserDetails().customerName,
            mobile: getUserDetails().mobile,
            farmId: getLocationDetails()[0]._id,
            farmName: getLocationDetails()[0].farmName,
            farmCircleId: getLocationDetails()[0].farmCircleId,
            orderQuantity: getCart().length
        }
        // navigate('/billing')
    }
    return (
        <div className='cartScreen'>
            <div className='cartAddress'>
                <button className='address-button'>Add Address</button>
                <button className='address-button' onClick={() => setAddressVisible(true)}>Change Address</button>
                {addressVisible && <div className='addressSelect-overlay' >
                    <div className='addressSelect-content'>
                        <h5 onClick={() => setAddressVisible(false)}>close</h5>
                        <h3>Select the address</h3>
                        {addressList.map((val, index) => {
                            return (
                                <div className='addressList' key={index} onClick={() => handleAddress(val)}>
                                    <h3>{val.addressType}</h3>
                                    <p>{val.fullAddress}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>}
                {selectedAddress && <div>
                    <h3>{selectedAddress.addressType}</h3>
                    {selectedAddress.fullAddress}
                </div>}
            </div>
            <div className='cart-Items'>
                {cartItem.map((val, index) => {
                    return (
                        <div className='category-item' key={index}>
                            {val.image ? <img src={val.image} alt='' className='category-item-image'></img> : ''}
                            <div className="category-details">
                                <h4 className="category-product-name">{val.productName}</h4>
                                <p className="category-product-price">₹{val.price}</p>
                            </div>
                            {/* <CartButton state={{cartItem:cartItem,value:val,setcartItem:setcartItem()}}/> */}
                            <div className='cart-button'>
                                {cartItem.find(item => item._id === val._id) !== undefined && cartItem.find(item => item._id === val._id).quantity > 0 ? <button onClick={() => Remove(val)}>-</button> : ''}
                                {cartItem.find(item => item._id === val._id) !== undefined && cartItem.find(item => item._id === val._id).quantity > 0 ? <h5>{cartItem.find(item => item._id === val._id).quantity}</h5> : ''}
                                <button onClick={() => Add(val)}>+</button>
                            </div>
                        </div>
                    )
                })}

                <div className='cart-calculation'>
                    <div className='cart-amount'>
                        <p>SubTotal</p>
                        <p>{subTotal}</p>
                    </div>
                    <div className='cart-amount'>
                        <p>Delivery Amount</p>
                        <p>{deliveryAmount}</p>
                    </div>
                    <div className='cart-amount'>
                        <p>Discount</p>
                        <p>{discount}</p>
                    </div>
                    <hr />
                    <div className='cart-amount'>
                        <p>Total</p>
                        <p>{total}</p>
                    </div>
                    <button className='place-order' onClick={saveOrder}>Place Order</button>
                </div>

            </div>
            {/* <h3>{subTotal}</h3>
            <h4>{deliveryAmount}</h4>
            <h4>{discount}</h4>
            <h1>{total}</h1> */}


        </div>
    )
}

export default Checkout
