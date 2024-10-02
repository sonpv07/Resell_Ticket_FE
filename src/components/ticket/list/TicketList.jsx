import React from "react";
import "./TicketList.scss";
import TicketCard from "../card/TicketCard";

export default function TicketList({ ticketData }) {
  return (
    <div className="ticket-list__grid">
      {ticketData.map((ticket, index) => (
        <TicketCard key={index} {...ticket} />
      ))}
    </div>
  );
}
