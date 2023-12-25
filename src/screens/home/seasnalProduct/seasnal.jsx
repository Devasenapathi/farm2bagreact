import React, { useEffect, useState } from 'react'
import './seasnal.css'
import { farmItemService } from '../../../services/b2c_service'
import { getCart, getLocationDetails, setCart } from '../../../utils/storage'

const Seasnal = ({ location }) => {
  const [farmItem, setFarmItem] = useState([])
  useEffect(() => {
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

  const AddCart = (data) => {
    if (getCart().some(res => res._id ===data._id)) {
      // const items = getCart()
      // const addItem = { ...data, quantity: 1 }
      // setCart([...items, addItem])
    } else {
      const items = getCart()
      const addItem = { ...data, quantity: 1 }
      setCart([...items, addItem])
    }
  }

  return (
    <div>
      {farmItem &&
        <div>
          <h3>Seasnal products</h3>
          <div className="scrollable-container">
            <div className="scrollable-content">
              {farmItem.map((val, index) => {
                return (
                  <div className='item' key={index}>
                    {val.image ? <img src={val.image} alt='' className='item-image'></img> : ''}
                    <div className="product-details">
                      <h2 className="product-name">{val.productName}</h2>
                      <p className="product-price">₹{val.price}</p>
                    </div>
                    <h5>{getCart().find(item => item._id === val._id) !== undefined?getCart().find(item => item._id === val._id).quantity:''}</h5>
                    <button onClick={() => AddCart(val)}>Add cart</button>
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
