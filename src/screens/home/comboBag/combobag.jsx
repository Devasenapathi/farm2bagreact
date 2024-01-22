import React, { useEffect, useState } from 'react'
import { farmItemService } from '../../../services/b2c_service'
import { getCart, getLocationDetails, getProductList } from '../../../utils/storage'
import { AddCart, RemoveCart } from '../../../services/cart_service'
import './combobag.css'


const Combobag = ({ location }) => {
    const [farmItem, setFarmItem] = useState([])
    const [cartData, setCartData] = useState()
    useEffect(() => {
        setCartData(getCart())
        setFarmItem(getProductList()&&getProductList().filter((data) => data.productType === "ComboBag"))
    }, [location])

    const Add = (data) => {
        const value = AddCart(data)
        if (value) {
            setCartData(getCart())
        }
    }
    const Remove = (data) => {
        const value = RemoveCart(data)
        if (value) {
            setCartData(getCart())
        }
    }
    return (
        <div>
            {farmItem &&
                <div>
                    <div className="combo-container">
                        <h1>ComboBag</h1>
                        <div className="combo-content">
                            {farmItem.map((val, index) => {
                                return (
                                    <div className='combo-item' key={index}>
                                        {val.image ? <img src={val.image} alt='' className='combo-item-image'></img> : ''}
                                        <div className="combo-details">
                                            <h6 className="combo-product-name">{val.productName}</h6>
                                            <p className="combo-product-price">₹{val.price}</p>
                                        </div>
                                        {/* <CartButton state={{cartData:cartData,value:val,setCartData:setCartData()}}/> */}
                                        <div className='cart-button'>
                                            {cartData.find(item => item._id === val._id) !== undefined && cartData.find(item => item._id === val._id).quantity > 0 ? <button onClick={() => Remove(val)}>-</button> : ''}
                                            {cartData.find(item => item._id === val._id) !== undefined && cartData.find(item => item._id === val._id).quantity > 0 ? <h5>{cartData.find(item => item._id === val._id).quantity}</h5> : ''}
                                            <button onClick={() => Add(val)}>+</button>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Combobag
