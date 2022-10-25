import React from 'react';
import"./Noodle.css";

function Noodle() {
  return (
    <div className='noodle'>
        <div className='Product_info'>
            <p>เส้นเล็ก</p>
            <p className='product_price'>
                <small>฿</small>
                <strong>30</strong>
            </p>
        </div>
    </div>
  )
}

export default Noodle