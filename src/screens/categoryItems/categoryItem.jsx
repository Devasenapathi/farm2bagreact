import React from 'react'
import './categroyItem.css'

const CategoryItem = () => {
    const [product, setProduct] = useState([])
  return (
    <div>
      <div className="product-card">
      <img src={image} alt={''} className="product-image" />
      <div className="product-details">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>
        <p className="product-price">${price}</p>
        <button className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
    </div>
  )
}

export default CategoryItem
