import React, { useState } from 'react';
import "./Noodle.css";
import { useStateValue } from './stateprovider';
import EditNoodleModal from './EditNoodle';
import { db } from './firebase'; // Import Firebase db

function Noodle({ id, title, price, img, userRole, updateNoodles }){
  const [{basket},dispatch] = useStateValue();
  const [selectedOption, setSelectedOption] = useState("ปกติ");

  const calculatePrice = () => {
    switch(selectedOption) {
      case "พิเศษ":
      case "พิเศษ+เส้น":
      case "พิเศษ+ลูกชิ้น":
      case "พิเศษ+เนื้อ":
        return 50;
      default:
        return price;
    }
  }

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title + (selectedOption !== "ปกติ" ? ` (${selectedOption})` : ""),
        img: img,
        price: calculatePrice(),
      },
    });
  };

  const deleteNoodle = () => {
    db.collection("Noodle").doc(id).delete()
      .then(() => {
        alert("Noodle successfully deleted!");
        updateNoodles();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  }

  return (
    <div className='noodle'>
      {userRole === 'Admin' && <EditNoodleModal id={id} title={title} price={price} updateNoodles={updateNoodles} />}
      {userRole === 'Admin' && <button onClick={deleteNoodle}>Delete</button>}
      <div className='Product_info'>
        <p>{title}</p>
        <p className='product_price'>
        <small>฿</small>
        <strong>{calculatePrice()}</strong>
        </p>
      </div>
      <img src={img} alt=''/>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="ปกติ">ปกติ</option>
        <option value="พิเศษ">พิเศษ</option>
        <option value="พิเศษ+เส้น">พิเศษ+เส้น</option>
        <option value="พิเศษ+ลูกชิ้น">พิเศษ+ลูกชิ้น</option>
        <option value="พิเศษ+เนื้อ">พิเศษ+เนื้อ</option>
      </select>
      <button onClick={addToBasket}>ใส่ตะกร้า</button>
    </div>
  )
}

export default Noodle;
