import React, { useEffect, useState } from "react";
import "./SellerProfile.scss";
import UserService from "../../../services/user.service";
import { useParams } from "react-router-dom";
import Report from "../../../components/report/Report";
import TicketService from "../../../services/ticket.service";
import TicketList from "../../../components/ticket/list/TicketList";
import FeedbackService from "../../../services/feedack.service";
import OrderService from "../../../services/order.service";

export default function SellerProfile() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [seller, setSeller] = useState(null);

  const [tickets, setTickets] = useState([]);

  const [showReportModal, setShowReportModal] = useState(false);

  const fetchData = async () => {
    const response = await UserService.getProfile(id);

    if (response?.success) {
      console.log(response?.data);
      setSeller(response.data);

      let body = {
        iD_Customer: response.data.iD_Customer,
      };

      const ratingData = await FeedbackService.getSellerRating(body);

      const orderCount = await OrderService.getOrderBySeller(id);

      let orderList = orderCount.data.filter(
        (item) => item.status === "COMPLETED"
      );

      console.log(orderCount);

      setSeller({
        ...response.data,
        average_feedback: ratingData?.data,
        orderCount: orderList.length,
      });
    }
  };

  const fetchTicketData = async () => {
    try {
      const response = await TicketService.getTicketListBySeller(id);

      if (response.success) {
        const filterData = response.data.filter(
          (item) => item.status === "Available"
        );

        setTickets(filterData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchDataAndTickets = async () => {
      await Promise.all([fetchData(), fetchTicketData()]);
      setLoading(false);
    };
    fetchDataAndTickets();

    return () => {
      setSeller(null);
      setTickets([]);
    };
  }, [id]);

  return (
    <div className="seller-profile">
      <div className="seller-profile__info">
        <h1 className="seller-profile__name">{seller?.name}</h1>

        <p>
          <span>Email:</span> {seller?.email}
        </p>
        <p>
          <span>Contact:</span> {seller?.contact}
        </p>
        <p>
          <span>Rating:</span> {seller?.average_feedback}⭐
        </p>
        <p>
          <span>Success Order:</span> {seller?.orderCount}
        </p>

        <button
          className="seller-profile__report-btn"
          onClick={() => setShowReportModal(true)}
        >
          Report Seller
        </button>
      </div>
      <h2 className="seller-profile__tickets-title">Tickets for Sale</h2>
      <div className="seller-profile__tickets">
        <TicketList ticketList={tickets} isLoading={loading} />
      </div>
      {showReportModal && (
        <Report
          isShow={showReportModal}
          setIsShow={setShowReportModal}
          sellerId={seller.iD_Customer}
        />
      )}
    </div>
  );
}
