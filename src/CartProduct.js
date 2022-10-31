import React from 'react'
import './CartProduct.css'
function CartProduct({id,img,title,price}) {
  return (
    <div className='cartProduct'>
            <img className='cartProduct_item' src={img}/>
            <div className='cartProduct_info'>
                <p className='cartProduct_title'>{title}
                </p>
            </div>
    </div>
  )
}
export default CartProduct