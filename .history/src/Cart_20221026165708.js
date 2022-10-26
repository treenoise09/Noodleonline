import React from 'react'

function Cart() {
  return (
    <div className='Cart'>
        <div className='checkout_left'>
            <div>
                <h2 className='cheakout_title'>
                    Your Shopping Basket
                </h2>
            </div>
        </div>
        <div className='cheackout_right'>
                    <Subtotal/>
        </div>
    </div>
  )
}

export default Cart