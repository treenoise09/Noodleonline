import React from 'react';
import './CartProduct.css';
import { useStateValue } from "./stateprovider";

function CartProduct({ id, title, price }) {
  const [{ basket }, dispatch] = useStateValue();

  // Find the item in the basket
  const item = basket.find(item => item.title === title);
  const quantity = item ? item.quantity : 0; // Get the current quantity

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });
  };

  const changeQuantity = (newQuantity) => {
    dispatch({
      type: 'CHANGE_QUANTITY',
      id: id,
      quantity: newQuantity,
    });
  };

  return (
    <div className='cartProduct'>
      <div className='cartProduct_info'>
        <p className='cartProduct_title'>{title}</p>
        <p>฿{price*quantity}</p>
        <p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => changeQuantity(Math.max(1, Number(e.target.value)))}
            min="1"
          />
        </p>
        <button onClick={removeFromBasket}>ลบ</button>
      </div>
    </div>
  );
}

export default CartProduct;
