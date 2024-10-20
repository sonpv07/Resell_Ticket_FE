import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OrderHistory.scss";
import OrderService from "../../services/order.service";
import { AuthContext } from "../../context/AuthContext";
import { SettingOutlined } from "@ant-design/icons";
import moment from "moment";
import { currencyFormatter } from "../../utils";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useContext(AuthContext);

  const fetchOrders = async () => {
    const response = await OrderService.getOrderByUser(user.iD_Customer);

    if (response.success) {
      const data = response.data
        .filter(
          (item) =>
            item?.iD_CustomerNavigation?.iD_Customer === user.iD_Customer
        )
        .reverse();

      setOrders(data);
    }
  };

  useEffect(() => {
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
            <th>Date</th>
            <th>Seat</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={order?.iD_Order}>
              <td>{index + 1}</td>
              <td>{order.orderDetails[0]?.iD_TicketNavigation?.show_Name}</td>
              <td>{moment(order?.create_At).format("LLL")}</td>
              <td>
                {order?.orderDetails[0]?.iD_TicketNavigation?.seat ?? "N/A"}
              </td>
              <td>
                {order.totalPrice ? currencyFormatter(order.totalPrice) : "N/A"}
              </td>
              <td>{order.status}</td>
              <td>
                {order.status === "COMPLETED" ? (
                  <Link
                    to={`/feedback/${order.iD_Order}`}
                    className="feedback-btn"
                  >
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
