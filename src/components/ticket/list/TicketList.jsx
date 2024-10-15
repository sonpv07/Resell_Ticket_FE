import React, { useEffect, useState } from "react";
import "./TicketList.scss";
import TicketCard from "../card/TicketCard";
import TicketService from "../../../services/ticket.service";

export default function TicketList({ ticketList, isLoading }) {
  // const [sellerInfo, setSellerInfo] = useState();

  return (
    <div className="ticket-list__grid">
      {ticketList.map((ticket, index) => (
        <TicketCard key={index} {...ticket} isLoading={isLoading} />
      ))}
    </div>
  );
}
