import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCompletedOrders } from '../../services/axios/axios';
import './OrderHistory.scss'; 

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getCompletedOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history-container">
      <h1>Your Completed Orders</h1>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <span>Order ID: {order.id}</span>
            <span>Order Date: {new Date(order.date).toLocaleDateString()}</span>
            <span>Total: {order.totalAmount} VND</span>
            <Link to={`/feedback/${order.id}`} className="feedback-btn">
              Give Feedback
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
