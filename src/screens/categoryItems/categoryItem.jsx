import React, { useEffect, useState } from 'react'
import { categoryService, farmItemService } from '../../services/b2c_service'
import { getCart, getLocationDetails } from '../../utils/storage'
import { AddCart, RemoveCart } from '../../services/cart_service'
import './categoryItem.css'
import CartButton from '../cart/cart_button'

const CategoryItem = (props) => {
  const [farmItem, setFarmItem] = useState([])
  const [cartData, setCartData] = useState()
  const [selectedCategory, setSelectedCategory] = useState()
  const [category, setCategory] = useState([])

  useEffect(() => {
    console.log(props,'props')
    categoryService().then((res) => {
      console.log(selectedCategory)
      if (res.status === 201) {
        setCategory(res.data.result)
      } else {
        console.log("Error in Category loading")
      }
    }).catch((err) => console.log(err))
  }, [selectedCategory])

  useEffect(() => {
    setCartData(getCart())
    const data = {
      lat: getLocationDetails()[0] ? getLocationDetails()[0].lattitude : '',
      lng: getLocationDetails()[0] ? getLocationDetails()[0].longitude : '',
      pincode: getLocationDetails()[0] ? getLocationDetails()[0].pincode : ''
    }
    farmItemService(data).then((res) => {
      if (res.status === 200) {
        setFarmItem(res.data.result.filter((data) => data.productCategoryId._id === selectedCategory._id))
      } else {
        console.log("Error on getting farmItem");
      }
    }).catch((err) => { console.log(err, 'error on seasnol product fetching') })
  }, [category])

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
      <div className='category-main'>
        {category.map((val, index) => {
          return (
            <div className='category-type' onClick={()=>{setSelectedCategory(val)}} key={index}>
              {val.categoryName}
            </div>
          )
        })}
      </div>
      {farmItem &&
        <div>
          <div className="category-container">
            <h1>Categories</h1>
            <div className="category-content">
              {farmItem.map((val, index) => {
                return (
                  <div className='category-item' key={index}>
                    {val.image ? <img src={val.image} alt='' className='category-item-image'></img> : ''}
                    <div className="category-details">
                      <h4 className="category-product-name">{val.productName}</h4>
                      <p className="category-product-price">₹{val.price}</p>
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
            <CartButton/>
          </div>
        </div>
      }
    </div>
  )
}

export default CategoryItem
