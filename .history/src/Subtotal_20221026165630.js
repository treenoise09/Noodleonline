import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format";
function Subtotal() {
  return (
    <div className='Subtotal'>
<CurrencyFormat
renderText={(value) => (
<>
    <p>
        Subtotal({Basket.length} item):
        <strong>{`${value}`}</strong>
        </p>
        <small className='subtotal_gift'>
            <input type="checkbox"/>This order contain a gift
        </small>
        </>
)}
decimalScale={2}
value={getBasketTotal(Basket)}
displayType={"text"}
thousandSeparator={true}
prefix="฿"
/>
    </div>
  )
}

export default Subtotal