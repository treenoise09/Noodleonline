import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { db, firebase } from "./firebase";
import './Report.css';
import { Line } from 'react-chartjs-2';

function Report({ userRole }) {
  const [bestSelling, setBestSelling] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [dailyIncome, setDailyIncome] = useState(0);
  const [dailyOrdersCount, setDailyOrdersCount] = useState(0);
const [dineInCount, setDineInCount] = useState(0);
const [takeOutCount, setTakeOutCount] = useState(0);
const [chartData, setChartData] = useState({});


  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== 'Admin') {
      navigate('/');
    } else {
      const unsubscribe = db.collection("Sale")
      .onSnapshot((snapshot) => {

        console.log("Fetched orders:", snapshot.docs.map(doc => doc.data()));
        const ordersData = snapshot.docs.map(doc => doc.data());
  
          // Calculate best selling items
          const itemSalesCount = {};
          ordersData.forEach(order => {
            order.items.forEach(item => {
              if (itemSalesCount[item.title]) {
                itemSalesCount[item.title]++;
              } else {
                itemSalesCount[item.title] = 1;
              }
            });
          });
          
          const bestSellingItems = Object.entries(itemSalesCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)  // get top 3
            .map(([title, _]) => title);
          setBestSelling(bestSellingItems);
          
          
          // Calculate total income
          const totalIncome = ordersData.reduce((sum, order) => sum + order.totalPrice, 0);
          setTotalIncome(totalIncome);
  
          // Calculate daily income
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          const dailyIncome = ordersData
            .filter(order => order.timestamp.toDate() >= today && order.timestamp.toDate() < tomorrow)
            .reduce((sum, order) => sum + order.totalPrice, 0);
          setDailyIncome(dailyIncome);
          const dailyOrders = ordersData
    .filter(order => order.timestamp.toDate() >= today && order.timestamp.toDate() < tomorrow);

setDailyOrdersCount(dailyOrders.length);


const dineIn = ordersData.filter(order => order.deliveryAddress === null);
const takeOut = ordersData.filter(order => order.deliveryAddress !== null);

setDineInCount(dineIn.length);
setTakeOutCount(takeOut.length);


setOrdersData(snapshot.docs.map(doc => doc.data()));

        } , (error) => {
          console.error("Error fetching and calculating data:", error);
        });
  
      return () => unsubscribe();
    }
  }, [userRole, navigate]);
  useEffect(() => {
    generateChartData();
  }, [ordersData]);
  const generateChartData = () => {
    console.log("Generating chart data");

  // Get dates for the past week
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 6);
  let currentDay = new Date(start);
  
  const labels = [];
  const dailyTotals = new Array(7).fill(0); // Array for totals of each day

  // Generate labels and initialize dailyTotals for each day of the week
  for (let i = 0; i < 7; i++) {
    labels.push(currentDay.toDateString());
    currentDay.setDate(currentDay.getDate() + 1);
  }

    // Sum up totals for each day
    ordersData.forEach(order => {
      const orderDate = order.timestamp.toDate();
      const orderDayString = orderDate.toDateString();
  
      const dayIndex = labels.findIndex(label => label === orderDayString);
      if (dayIndex !== -1) {
        dailyTotals[dayIndex] += order.totalPrice;
      }
    });

    // Move to the next day
  //   currentDay.setDate(currentDay.getDate() + 1);
  // }

  setChartData({
    labels: labels,
    datasets: [{
      label: 'Income over the week',
      data: dailyTotals,
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
    }]
  });
  console.log("Set labels to:", labels);
  console.log("Set data to:", dailyTotals);
}

const options = {
  responsive: true,
  maintainAspectRatio: false,  // Add this line
  aspectRatio: 1,  // You can change this number to adjust aspect ratio
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day'
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        min: 0,
        max: 1000,
        callback: function(value, index, values) {
          return Math.round(value);  // Round the value
        }
      }
    }
  }
};

return (
  <div className="dashboard-container">
    <h1>Dashboard</h1>
    <div className="dashboard-content">
      <div className="column">
        <h2>Revenue</h2>
        <p>{dailyIncome}</p>
      </div>
      
      <div className="column">
        <h2>Orders</h2>
        <p>{dailyOrdersCount}</p>
      </div>

      <div className="column">
        <h2>Dine In</h2>
        <p>{dineInCount}</p>
      </div>

      <div className="column">
        <h2>Take Out</h2>
        <p>{takeOutCount}</p>
      </div>
    </div>
    <div className="chart-container">
  <Line options={options} data={chartData} />
</div>
  </div>
);
}

export default Report;