import React, { useEffect, useState } from "react";
import "./SellerProfile.scss";
import UserService from "../../../services/user.service";
import { useParams } from "react-router-dom";
import Report from "../../../components/report/Report";
import TicketService from "../../../services/ticket.service";
import TicketList from "../../../components/ticket/list/TicketList";

export default function SellerProfile() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [seller, setSeller] = useState({
    id: "1",
    name: "John's Ticket Shop",
    joinDate: "2022-01-15",
    rating: 4.7,
    totalSales: 1234,
  });

  const [tickets, setTickets] = useState([
    {
      id: "1",
      eventName: "Summer Music Festival",
      date: "2023-07-15",
      price: 150,
      quantity: 5,
    },
    {
      id: "2",
      eventName: "Rock Concert",
      date: "2023-08-20",
      price: 200,
      quantity: 3,
    },
    {
      id: "3",
      eventName: "Comedy Show",
      date: "2023-06-30",
      price: 80,
      quantity: 10,
    },
  ]);

  const [showReportModal, setShowReportModal] = useState(false);

  const fetchData = async () => {
    const response = await UserService.getProfile(id);

    if (response?.success) {
      console.log(response?.data);
      setSeller(response.data);
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
        <Report isShow={showReportModal} setIsShow={setShowReportModal} />
      )}
    </div>
  );
}
