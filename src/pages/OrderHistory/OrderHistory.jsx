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
      <table className="order-history-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Show Name</th>
            <th>Event Date</th>
            <th>Seat</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.showName}</td>
              <td>{new Date(order.eventDate).toLocaleDateString()}</td>
              <td>{order.seat}</td>
              <td>{order.price} VND</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'successful' ? (
                  <Link to={`/feedback/${order.id}`} className="feedback-btn">
                    Give Feedback
                  </Link>
                ) : (
                  <span className="no-feedback">No Feedback Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
