import React from 'react'
import CartProduct from './CartProduct'
import Subtotal from './Subtotal'
import './Cart.css'
import { useStateValue } from './stateprovider'

function Cart() {
  const [{basket},dispatch] = useStateValue();
  return (
    <div className='Cart'>
        <div className='checkout_left'>
            <div>
                <h2 className='cheakout_title'>
                    ตะกร้าของคุณ
                </h2>
                {basket.map((item, index) => (
  <CartProduct
    key={item.id + index}
    id={item.id}
    title={item.title}
    price={item.price}
  />
))}
            </div>
        </div>
        <div className='cheackout_right'>
                    <Subtotal/>
        </div>
    </div>
  )
}

export default Cart