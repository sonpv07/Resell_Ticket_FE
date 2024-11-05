import React, { useContext, useEffect, useState } from "react";
import "./RequestList.scss";
import RequestPriceService from "../../services/requestPrice.service";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import { currencyFormatter } from "../../utils";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";

export default function RequestList() {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const fetchOrders = async () => {
    const response = await RequestPriceService.getAllRequest();

    if (response?.success) {
      const data = response.data.filter(
        (item) => item?.iD_Customer === user?.iD_Customer
      );

      setRequests(data.reverse());
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-history-container">
      <h1>Your Request List</h1>
      <table className="order-history-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Ticket</th>
            <th>Ticket Price</th>
            <th>Request Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <tr key={request?.iD_Order}>
                <td>{index + 1}</td>
                <td>{request?.ticketNavigation?.show_Name}</td>
                <td>{currencyFormatter(request?.ticketNavigation?.price)}</td>
                <td>{currencyFormatter(request.price_want)} </td>
                <td>{request.quantity} </td>
                <td>
                  <Tag
                    color={
                      request?.status === "Pending"
                        ? "yellow"
                        : request?.status === "Completed"
                        ? "blue"
                        : "red"
                    }
                    key={request?.status}
                  >
                    {request?.status === "Completed"
                      ? "Approved".toUpperCase()
                      : request?.status.toUpperCase()}
                  </Tag>
                </td>
                <td>{moment(request?.history).format("LLL")}</td>

                <td>
                  <p
                    className="feedback-btn"
                    onClick={() => {
                      navigate(`/ticket/${request?.iD_Ticket}`);
                    }}
                  >
                    View Ticket
                  </p>
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
    </div>
  );
}
