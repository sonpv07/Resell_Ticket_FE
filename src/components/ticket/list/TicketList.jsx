import React, { useEffect, useState } from "react";
import "./TicketList.scss";
import TicketCard from "../card/TicketCard";
import TicketService from "../../../services/ticket.service";

export default function TicketList() {
  const [ticketList, setTicketList] = useState([]);

  // const [sellerInfo, setSellerInfo] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const response = await TicketService.getTicketList();

      if (response.success) {
        const filterData = response.data.filter(
          (item) => item.status === "Available"
        );

        setTicketList(filterData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="ticket-list__grid">
      {ticketList.map((ticket, index) => (
        <TicketCard key={index} {...ticket} isLoading={isLoading} />
      ))}
    </div>
  );
}
