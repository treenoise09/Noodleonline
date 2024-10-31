import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Import Firebase db
import "./status.css"

function OrderStatus() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        // Only get documents where status is not "Done"
        const ordersSnapshot = await db.collection("Sale").where("status", "!=", "Done").get();
        const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrdersData();
  }, []);


  const handleChangeStatus = (id, newStatus) => {
    db.collection("Sale").doc(id).update({
      status: newStatus,
    })
    .then(() => {
      if (newStatus === "Done") {
        // If order status is updated to "Done", remove it from local state
        setOrders(orders.filter(order => order.id !== id));
      } else {
        // Otherwise, just update the order status in the local state
        setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
      }
      console.log("Order status updated!");
    })
    .catch((error) => {
      console.error("Error updating order status: ", error);
    });
  }
  


  return (
    <div>
      <h1>Order Status</h1>
      <table>
      <thead>
  <tr>
    <th className="order-id">Order ID</th>
    <th>Contact</th>
    <th className="items-and-time">Items and Time</th>
    <th className="total-quantity">Total Quantity</th>
    <th className="status">Status</th>
    <th className="change-status">Change Status</th>
  </tr>
</thead>
<tbody>
  {orders.map(order => (
    <tr key={order.id}>
      <td className="order-id">{order.id.slice(0, 3)}...</td>
      <td>{order.tel}({order.name})</td>
      <td className="items-and-time">
        {order.items.map(item => (
          <p key={item.id}>{item.title} - {item.quantity} x {item.price}</p>
        ))}
        <p>Pickup Time: {order.pickupTime}</p>
      </td>
      <td className="total-quantity">{order.items.reduce((total, item) => total + item.quantity, 0)}</td>
      <td className="status">{order.status || "Pending"}</td>
      <td className="change-status">
        <button onClick={() => handleChangeStatus(order.id, "Cooking")}>Set to Cooking</button>
        <button onClick={() => handleChangeStatus(order.id, "Done")}>Set to Done</button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
  
}

export default OrderStatus;
