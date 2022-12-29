import React from 'react'
import './CartProduct.css'
import {useStateValue} from "./stateprovider"
function CartProduct({id,img,title,price,status,option}) {
  const [{basket},dispatch] = useStateValue();
  const removeFromBasket = () =>{
        dispatch({
          type:'REMOVE_FROM_BASKET',
          id:id,
        })
  }
  return (
    <div className='cartProduct'>
            <img className='cartProduct_item' src={img}/>
            <div className='cartProduct_info'>
                <p className='cartProduct_title'>{title}({status})
                </p>
                <p></p>
                <p>฿{price}</p>
            </div>
            <div>
              {option}
            </div>
            <button onClick={removeFromBasket}>Remove frome Cart</button>
    </div>
  )
}
export default CartProduct