import React from "react";
import "./PaymentBill.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export default function PaymentBill() {
  const location = useLocation();

  console.log(location);

  const navigate = useNavigate();

  const checkIsSuccess = () => {
    if (location.pathname === "/success-payment") return true;

    return false;
  };

  const paymentDetails = {
    orderId: "ORD-12345-ABCDE",
    amount: 150.0,
    date: "2023-05-25 14:30:00",
    paymentMethod: "Credit Card (**** 1234)",
  };

  const ticketDetails = {
    eventName: "Summer Music Festival",
    eventDate: "2023-07-15 18:00:00",
    quantity: 2,
    ticketType: "General Admission",
  };

  return (
    <div className="successful-payment">
      <div className="successful-payment__container">
        <div className="successful-payment__header">
          <h1
            className="successful-payment__title"
            style={{ color: checkIsSuccess() ? "#4caf50" : "red" }}
          >
            Payment {checkIsSuccess() ? "Successful!" : "Failed!"}
          </h1>

          {checkIsSuccess() ? (
            <CheckOutlined
              style={{
                color: "#4caf50",
                fontSize: 50,
              }}
            />
          ) : (
            <CloseOutlined
              style={{
                color: "red",
                fontSize: 50,
              }}
            />
          )}
        </div>

        <div className="successful-payment__details">
          <h2>Payment Details</h2>
          <ul>
            <li>
              <strong>Order ID:</strong> {paymentDetails.orderId}
            </li>
            <li>
              <strong>Amount Paid:</strong> ${paymentDetails.amount.toFixed(2)}
            </li>
            <li>
              <strong>Date:</strong> {paymentDetails.date}
            </li>
            <li>
              <strong>Payment Method:</strong> {paymentDetails.paymentMethod}
            </li>
          </ul>
        </div>

        <div className="successful-payment__ticket-info">
          <h2>Ticket Information</h2>
          <ul>
            <li>
              <strong>Event:</strong> {ticketDetails.eventName}
            </li>
            <li>
              <strong>Date:</strong> {ticketDetails.eventDate}
            </li>
            <li>
              <strong>Quantity:</strong> {ticketDetails.quantity}
            </li>
            <li>
              <strong>Type:</strong> {ticketDetails.ticketType}
            </li>
          </ul>
        </div>

        <div className="successful-payment__actions">
          <button className="successful-payment__button successful-payment__button--primary">
            View E-Tickets
          </button>
          <button
            className="successful-payment__button successful-payment__button--secondary"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>

        <div className="successful-payment__support">
          <p>
            If you have any questions, please contact our support team at
            support@ticketswap.com
          </p>
        </div>
      </div>
    </div>
  );
}
