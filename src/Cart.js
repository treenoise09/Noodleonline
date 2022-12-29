import React, { useState } from 'react'
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
                    Your Shopping Basket
                </h2>
                {basket.map(item =>(
                <CartProduct
                id={item.id}
                img={item.img}
                title={item.title}
                price={item.price}
                status={item.status}
                option={item.option}
                />))}
            </div>
        </div>
        <div className='cheackout_right'>
                    <Subtotal/>
        </div>
    </div>
  )
}

export default Cart