import React, { useEffect, useState } from 'react'
import './seasnal.css'
import { farmItemService } from '../../../services/b2c_service'
import { getCart, getLocationDetails } from '../../../utils/storage'
import { AddCart, RemoveCart } from '../../../services/cart_service'

const Seasnal = ({ location }) => {
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
        setFarmItem(res.data.result.filter((data) => data.seasonalProduct === true))
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
          <div className="seasnol-container">
          <h1>Seasnal products</h1>
            <div className="seasnol-content">
              {farmItem.map((val, index) => {
                return (
                  <div className='seasnol-item' key={index}>
                    {val.image ? <img src={val.image} alt='' className='seasnol-item-image'></img> : ''}
                    <div className="seasnol-details">
                      <h2 className="seasnol-product-name">{val.productName}</h2>
                      <p className="seasnol-product-price">₹{val.price}</p>
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

export default Seasnal
