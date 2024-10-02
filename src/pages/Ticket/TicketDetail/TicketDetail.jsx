import React, { useState } from "react";
import "./TicketDetail.scss";
import { Tag } from "antd";
import { getTagColor } from "../../../utils";

export default function TicketDetail() {
  const ticketData = {
    id: "1234",
    title: "VIP Ticket - Rock Festival 2023",
    price: 150,
    category: "Concert",
    quantity: 100,
    soldQuantity: 75,
    isNegotiation: false,
    ticket_detail:
      "VIP access to the Rock Festival 2023. Includes premium viewing area, complimentary drinks, and exclusive merchandise.",
    seller_info: {
      name: "EventMaster Tickets",
      rating: 4.8,
      totalSales: 1500,
    },
    event_info: {
      name: "Rock Festival 2023",
      date: "August 15-17, 2023",
      venue: "Sunshine Valley Amphitheater",
      description:
        "Join us for three days of non-stop rock music featuring top bands from around the world. Experience electrifying performances, great food, and unforgettable memories.",
      image: "https://media.hanoitimes.vn/2023/07/07/blackpink_los_angeles.jpg",
    },
  };

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const availableQuantity = ticketData.quantity - ticketData.soldQuantity;

  const handleQuantityChange = (e) => {
    setSelectedQuantity(Number(e.target.value));
  };

  const handleBuyNow = () => {
    console.log(`Buying ${selectedQuantity} tickets`);
    // Implement buy logic here
  };

  const handleAddToCart = () => {
    console.log(`Adding ${selectedQuantity} tickets to cart`);
    // Implement add to cart logic here
  };

  const handleChatWithSeller = () => {
    console.log("Opening chat with seller");
    // Implement chat logic here
  };

  return (
    <div className="ticket-detail">
      <div className="ticket-detail__container">
        <div className="ticket-detail__image-container">
          <img
            src={ticketData.event_info.image}
            alt={ticketData.event_info.name}
            className="ticket-detail__image"
          />
        </div>
        <div className="ticket-detail__info">
          <h1 className="ticket-detail__title">{ticketData.title}</h1>

          <Tag color={getTagColor(ticketData.category)}>
            {ticketData.category}
          </Tag>
          <div className="ticket-detail__price">
            ${ticketData.price.toFixed(2)}{" "}
            <span className="ticket-detail__price-note">per ticket</span>
          </div>
          <div className="ticket-detail__availability">
            {availableQuantity > 0 ? (
              <span className="ticket-detail__in-stock">In Stock</span>
            ) : (
              <span className="ticket-detail__out-of-stock">Out of Stock</span>
            )}
            <span className="ticket-detail__stock-count">
              {availableQuantity}{" "}
              {availableQuantity === 1 ? "ticket" : "tickets"} available
            </span>
          </div>
          <div className="ticket-detail__actions">
            <div className="ticket-detail__quantity">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={selectedQuantity}
                onChange={handleQuantityChange}
                disabled={availableQuantity === 0}
              >
                {Array.from({ length: availableQuantity }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="ticket-detail__button ticket-detail__button--primary"
              onClick={handleBuyNow}
              disabled={availableQuantity === 0}
            >
              Buy Now
            </button>
            <button
              className="ticket-detail__button ticket-detail__button--secondary"
              onClick={handleAddToCart}
              disabled={availableQuantity === 0}
            >
              Create Negotiation
            </button>
            <button
              className="ticket-detail__button ticket-detail__button--tertiary"
              onClick={handleChatWithSeller}
            >
              Chat with Seller
            </button>
          </div>
          <div className="ticket-detail__seller">
            <h2>Seller Information</h2>
            <p className="ticket-detail__seller-name">
              {ticketData.seller_info.name}
            </p>
            <div className="ticket-detail__seller-rating">
              Rating: {ticketData.seller_info.rating.toFixed(1)}
              <span className="ticket-detail__star">⭐</span>
            </div>
          </div>
        </div>
      </div>
      <div className="ticket-detail__description">
        <h2>Ticket Details</h2>
        <p>{ticketData.ticket_detail}</p>
      </div>
    </div>
  );
}
