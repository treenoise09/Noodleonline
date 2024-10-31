import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './stateprovider';
import { getBasketTotal } from './reducer';
import { db, firebase } from './firebase'; 

function Subtotal() {
  const [{basket, user, pickupTime, deliveryAddress}, dispatch] = useStateValue();

  const handlePurchase = () => {
    if (!user) {
      alert("Please sign in before proceeding to checkout");
      return;
    }
  
    if (!pickupTime && !deliveryAddress) {
      dispatch({ type: 'SET_LOCATION_MODAL_OPEN', locationModalOpen: true });
      return;
    }
  
    console.log(user);
    db.collection("Sale").add({
      userId: user._delegate.uid,
      name:user.name,
      tel: user.tel,
      items: basket,
      totalPrice: getBasketTotal(basket),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      pickupTime: pickupTime,
      deliveryAddress: deliveryAddress,
      status: "Pending", // Add this line
    })
    .then(() => {
      console.log("Order successfully created!");
      dispatch({ type: "EMPTY_BASKET" });
    })
    .catch((error) => {
      console.error("Error creating order: ", error);
    });
  }
  
  return (
    <div className='Subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              รวมสินค้า({basket.length} รายการ):<strong>{value}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix="฿"
      />
      <button onClick={handlePurchase}>ชำระเงิน</button>
    </div>
  )
}

export default Subtotal;
