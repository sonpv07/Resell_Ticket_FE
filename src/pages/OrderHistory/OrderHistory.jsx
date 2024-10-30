import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCustomerOrders  } from '../../services/axios/axios';
import './OrderHistory.scss'; 

const OrderHistory = ({ customerId }) => {  
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getCustomerOrders (customerId);  
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (customerId) { 
      fetchOrders();
    }
  }, [customerId]);

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
          {orders.length > 0 ? (
            orders.map((order) => (
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
            ))
          ) : (
            <tr>
              <td colSpan="7">No completed orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
