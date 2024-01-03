import React, { useEffect, useState } from 'react'
import { farmItemService } from '../../../services/b2c_service'
import { getCart, getLocationDetails } from '../../../utils/storage'
import { AddCart, RemoveCart } from '../../../services/cart_service'
import './dailyFresh.css'


const DailyFresh = ({ location }) => {
    const [farmItem, setFarmItem] = useState([])
    const [cartData, setCartData] = useState()
    useEffect(() => {
        setCartData(getCart())
        const data = {
            lat: getLocationDetails()[0] ? getLocationDetails()[0].lattitude : '',
            lng: getLocationDetails()[0] ? getLocationDetails()[0].longitude : '',
            pincode: getLocationDetails()[0] ? getLocationDetails()[0].pincode : ''
        }
        farmItemService(data).then((res) => {
            if (res.status === 200) {
                setFarmItem(res.data.result.filter((data) => data.dailyFresh === true))
            } else {
                console.log("Error on getting farmItem");
            }
        }).catch((err) => { console.log(err, 'error on seasnol product fetching') })
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
                    <div className="daily-container">
                        <h1>DailyFresh</h1>
                        <div className="daily-content">
                            {farmItem.map((val, index) => {
                                return (
                                    <div className='daily-item' key={index}>
                                        {val.image ? <img src={val.image} alt='' className='daily-item-image'></img> : ''}
                                        <div className="daily-details">
                                            <h2 className="daily-product-name">{val.productName}</h2>
                                            <p className="daily-product-price">₹{val.price}</p>
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

export default DailyFresh
