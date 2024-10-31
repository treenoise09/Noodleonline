import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import './History.css';

function History() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        console.log("Auth User found:", authUser);
        fetchOrders(authUser.uid);
      } else {
        console.log("No Auth User");
        setIsLoading(false);
      }
    });

    return unsubscribe; // Unsubscribe when component unmounts
  }, []);

  const fetchOrders = async (userId) => {
    setIsLoading(true);
    try {
      console.log("Fetching orders for UserId:", userId);
      const ordersSnapshot = await db.collection("Sale")
                                     .where("userId", "==", userId)
                                     .get();
      let ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Orders fetched:", ordersData);

      // Filter out orders with status "Done"
      ordersData = ordersData.filter(order => order.status !== "Done");
      
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching order data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  
  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading indicator
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
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="order-id">{order.id.slice(0, 3)}...</td>
              <td>{order.tel} ({order.name})</td>
              <td className="items-and-time">
                {order.items.map(item => (
                  <p key={item.id}>{item.title} - {item.quantity} x {item.price}</p>
                ))}
                <p>Pickup Time: {order.pickupTime}</p>
              </td>
              <td className="total-quantity">{order.items.reduce((total, item) => total + item.quantity, 0)}</td>
              <td className="status">{order.status || "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default History;
