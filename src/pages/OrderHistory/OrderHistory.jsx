import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./OrderHistory.scss";
import Feedback from "../Feedback/Feedback";
import OrderService from "../../services/order.service";
import { AuthContext } from "../../context/AuthContext";
import { currencyFormatter } from "../../utils";
import FeedbackService from "../../services/feedack.service";
import Report from "../../components/report/Report";
import ReportService from "../../services/report.service";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [reports, setReports] = useState([]);
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);
  const [chosenOrder, setChosenOrder] = useState(null);
  const [chosenFeedback, setChosenFeedback] = useState(null);
  const [chosenReport, setChosenReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const { user } = useContext(AuthContext);

  const fetchOrders = async () => {
    const response = await FeedbackService.getFeedbackByCustomer(
      user.iD_Customer
    );

    setFeedbacks(response.data);

    const responseReport = await ReportService.getReports();

    setReports(responseReport.data);

    const responseOrders = await OrderService.getOrderByUser();

    console.log(responseReport);

    if (responseOrders.success && response.success && responseReport.success) {
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
        report: responseReport.data.find(
          (rp) =>
            rp.iD_Order === order.iD_Order &&
            user?.iD_Customer === rp?.iD_OrderNavigation?.iD_Customer
        ),
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
            <th>ID</th>
            <th>Ticket</th>
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
                <td>
                  {order?.orderDetails[0]?.iD_TicketNavigation?.seat ?? "N/A"}
                </td>
                <td>{order?.orderDetails[0]?.iD_TicketNavigation?.location}</td>
                <td>{currencyFormatter(order.totalPrice)} </td>
                <td>{order?.status}</td>
                <td>{moment(order?.create_At).format("LLL")}</td>
                <td style={{ display: "flex", gap: 10 }}>
                  {order.status === "COMPLETED" ? (
                    <>
                      {order.feedback ? (
                        <p
                          className="feedback-btn"
                          onClick={() => {
                            setChosenFeedback(order.feedback ?? null);
                            setChosenOrder(order.iD_Order);
                            setIsOpenFeedback(true);
                          }}
                        >
                          View Feedback
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
                      )}

                      {order?.report ? (
                        <p
                          className="feedback-btn"
                          style={{ background: "red" }}
                          onClick={() => {
                            setChosenReport(order.report ?? null);
                            setChosenOrder(order.iD_Order);
                            setShowReportModal(true);
                          }}
                        >
                          View Report
                        </p>
                      ) : (
                        <p
                          className="feedback-btn"
                          style={{ background: "red" }}
                          onClick={() => {
                            setChosenReport(order.report ?? null);
                            setShowReportModal(true);
                            setChosenOrder(order.iD_Order);
                          }}
                        >
                          Report
                        </p>
                      )}
                    </>
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

      {showReportModal && (
        <Report
          isShow={showReportModal}
          setIsShow={setShowReportModal}
          // sellerId={seller.iD_Customer}
          orderId={chosenOrder}
          setOrderList={setOrders}
          orderList={orders}
          reportData={chosenReport}
        />
      )}
    </div>
  );
};

export default OrderHistory;
