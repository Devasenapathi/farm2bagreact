import React, { useEffect } from 'react'
import { AddCart } from '../../services/cart_service'
import { getCart } from '../../utils/storage'
import { Link } from 'react-router-dom'
import './cart_button.css'
const CartButton = (props) => {
    useEffect(() => {
        console.log(props, 'cartData')
    }, [])
    // const Add = (data) => {
    //     const value = AddCart(data)
    //     if (value) {
    //         // setCartData(getCart())
    //     }
    // }
    // const Remove = (data) => {
    //     const value = RemoveCart(data)
    //     if (value) {
    //         // setCartData(getCart())
    //     }
    // }
    return (
        <div className='bottom-cart-button'>
            <Link to={'/checkout'} className='bottom-cart'>cart</Link>
        </div>
    )
}

export default CartButton
