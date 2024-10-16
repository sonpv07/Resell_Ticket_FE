// src/components/OrderHistory.jsx
import React from 'react';
import './OrderHistory.scss'; // Make sure to import the SCSS file
import mockOrders from '../pages/mockOrders'; 

const OrderHistory = ({ customerId }) => {
    const userOrders = mockOrders.filter(order => order.customerId === customerId);

    return (
        <div className="order-history">
            <h1>Order History</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Show Name</th>
                        <th>Event Date</th>
                        <th>Seat</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {userOrders.length > 0 ? (
                        userOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.showName}</td>
                                <td>{order.eventDate}</td>
                                <td>{order.seat}</td>
                                <td>${order.price}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No orders found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;
