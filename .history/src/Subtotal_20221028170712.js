import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './stateprovider';
import { getBasketTotal } from './reducer';
function Subtotal() {
  const [{basket},dispatch] = useStateValue();

  return (
    <div className='Subtotal'>
<CurrencyFormat
renderText={(value) => (
<>
    <p>
        Subtotal({basket.length} item):<strong>{value}</strong>
        </p>
        <small className='subtotal_gift'>
            <input type="checkbox"/>This order contain a gift
        </small>
        </>
)}
decimalScale={2}
value={getBasketTotal(basket)}
displayType={"text"}
thousandSeparator={true}
prefix="฿"
/>
    <button>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal