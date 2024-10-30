import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./OrderHistory.scss";
import Feedback from "../Feedback/Feedback";
import OrderService from "../../services/order.service";
import { AuthContext } from "../../context/AuthContext";
import { currencyFormatter } from "../../utils";
import FeedbackService from "../../services/feedack.service";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);
  const [chosenOrder, setChosenOrder] = useState(null);
  const [chosenFeedback, setChosenFeedback] = useState(null);

  const { user } = useContext(AuthContext);

  const fetchOrders = async () => {
    const response = await FeedbackService.getFeedbackByCustomer(
      user.iD_Customer
    );

    setFeedbacks(response.data);

    const responseOrders = await OrderService.getOrderByUser();

    console.log(responseOrders);

    if (responseOrders.success) {
      const data = responseOrders.data.filter(
        (item) =>
          item?.iD_CustomerNavigation?.iD_Customer === user?.iD_Customer &&
          item?.status !== "PENDING"
      );

      const updatedOrders = data.map((order) => ({
        ...order,
        feedback: response.data
          ? response.data.find((fb) => fb.iD_Order === order.iD_Order)
          : null,
      }));

      setOrders(updatedOrders.reverse());
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);

  return (
    <div className="order-history-container">
      <h1>Your Orders</h1>
      <table className="order-history-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Show Name</th>
            <th>Event Date</th>
            <th>Seat</th>
            <th>Location</th>
            <th>Price</th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order?.iD_Order}>
                <td>{index + 1}</td>
                <td>
                  {order?.orderDetails[0]?.iD_TicketNavigation?.show_Name}
                </td>
                <td>
                  {moment(
                    order?.orderDetails[0]?.iD_TicketNavigation?.event_Date
                  ).format("LLL")}
                </td>
                <td>{order?.orderDetails[0]?.iD_TicketNavigation?.seat}</td>
                <td>{order?.orderDetails[0]?.iD_TicketNavigation?.location}</td>
                <td>{currencyFormatter(order.totalPrice)} </td>
                <td>{order?.status}</td>
                <td>{order?.create_At}</td>
                <td>
                  {order.status === "COMPLETED" ? (
                    order.feedback ? (
                      <p
                        className="feedback-btn"
                        onClick={() => {
                          setChosenFeedback(order.feedback ?? null);
                          setChosenOrder(order.iD_Order);
                          setIsOpenFeedback(true);
                        }}
                      >
                        View Your Feedback
                      </p>
                    ) : (
                      <p
                        className="feedback-btn"
                        onClick={() => {
                          setChosenFeedback(order.feedback ?? null);
                          setChosenOrder(order.iD_Order);
                          setIsOpenFeedback(true);
                        }}
                      >
                        Give Feedback
                      </p>
                    )
                  ) : (
                    <span className="no-feedback">No Feedback Available</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {isOpenFeedback && (
        <Feedback
          isOpen={isOpenFeedback}
          setIsOpen={setIsOpenFeedback}
          orderId={chosenOrder}
          feedbackData={chosenFeedback}
          orderList={orders}
          setOrderList={setOrders}
        />
      )}
    </div>
  );
};

export default OrderHistory;
