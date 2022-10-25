import React from 'react';
import"./Noodle.css";


function Noodle({id,title,img,price}) {
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
        <button>Add to Basket</button>
    </div>
  )
}

export default Noodle