// src/components/OrderHistory.jsx
import React, { useContext, useEffect, useState } from "react";
import "./OrderHistory.scss"; // Make sure to import the SCSS file
import mockOrders from "../pages/mockOrders";
import { AuthContext } from "../context/AuthContext";
import OrderService from "../services/order.service";
import moment from "moment";

const OrderHistory = () => {
  const { user } = useContext(AuthContext);

  const [orderList, setOrderList] = useState([]);

  const userOrders = mockOrders.filter(
    (order) => order.customerId === user.iD_Customer
  );

  const fetchData = async () => {
    const response = await OrderService.getOrderByUser();

    if (response.success) {
      const list = response.data.filter(
        (item) => item?.iD_CustomerNavigation?.iD_Customer === user.iD_Customer
      );

      setOrderList(list);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(orderList);

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
          {orderList.length > 0 ? (
            orderList.map((order) => (
              <tr key={order?.iD_Order}>
                <td>{order?.iD_Order}</td>
                <td>
                  {order?.orderDetails[0]?.iD_TicketNavigation?.show_Name}
                </td>
                <td>
                  {moment(
                    order?.orderDetails[0]?.iD_TicketNavigation?.event_Date
                  ).format("LLL")}
                </td>
                <td>{order?.orderDetails[0]?.iD_TicketNavigation?.seat}</td>
                <td>${order?.totalPrice}</td>
                <td>{order?.status}</td>
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
