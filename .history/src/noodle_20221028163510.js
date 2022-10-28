import React from 'react';
import"./Noodle.css";
import { useStateValue } from './stateprovider';


function Noodle({id,title,img,price}) {
  const [{basket},dispatch] = useStateValue();
  const addTobasket = () => {
        dispatch({
          type:"ADD_TO_BASKET",
          item:{
            id: id,
            title: title,
            img: img,
            price: price,
          },
        });
  };
  return (
    <div className='noodle'>
        <div className='Product_info'>
            <p>{title}</p>
            <p className='product_price'>
                <small>฿</small>
                <strong>{price}</strong>
            </p>
        </div>
        <img src={img} alt=''/>
        <button onClick={addTobasket}>Add to Basket</button>
    </div>
  )
}

export default Noodle