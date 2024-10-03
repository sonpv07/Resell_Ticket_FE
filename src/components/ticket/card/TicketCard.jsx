import React from "react";
import "./TicketCard.scss";
import { Progress, Tag } from "antd";
import { ShoppingCartOutlined, StarFilled } from "@ant-design/icons";
import { getTagColor } from "../../../utils";
import { useNavigate } from "react-router-dom";

export default function TicketCard({
  id = 1,
  price,
  name,
  category,
  quantity,
  soldQuantity,
  ticket_detail,
  seller_info,
  isNegotiation,
}) {
  const availableQuantity = quantity - soldQuantity;

  const navigation = useNavigate();

  return (
    <div className="ticket-card">
      <div className="ticket-card__header">
        <div className="ticket-card__title">
          <Tag color={getTagColor(category)}>{category}</Tag>
          Ticket
        </div>

        <div className="ticket-card__title">
          <Tag color={isNegotiation ? "green" : "#f44336"}>
            {isNegotiation ? "Can Negotiate" : "No Negotiate"}
          </Tag>
        </div>
      </div>
      <div className="ticket-card__content">
        <div className="ticket-card__name">
          <h2>{name}</h2>
        </div>

        <div className="ticket-card__price">
          <span className="ticket-card__currency">$</span>
          {price.toFixed(2)}

          <span className="ticket-card__price-note">per ticket</span>
        </div>
        <div className="ticket-card__availability">
          <div className="ticket-card__availability-row">
            <span>Available</span>
            <span className="ticket-card__availability-number">
              {availableQuantity}
            </span>
          </div>
          {/* <div className="ticket-card__progress-bar">
            <Progress
              showInfo={false}
              strokeColor={"#4caf50"}
              trailColor="#e0e0e0"
              percent={soldPercentage}
            />
          </div> */}
          <div className="ticket-card__availability-row">
            <span>Sold</span>
            <span className="ticket-card__availability-number">
              {soldQuantity} of {quantity}
            </span>
          </div>

          <div className="ticket-card__seller-info">
            <span className="ticket-card__seller-name">
              Seller: <span>{seller_info.name}</span>
            </span>
            <div className="ticket-card__seller-rating">
              Rating: {seller_info.rating.toFixed(1)}
              <span className="ticket-card__star">
                <StarFilled style={{ color: "yellow" }} />
              </span>
            </div>
          </div>

          <div className="ticket-card__ticket-detail">
            <div className="ticket-card__ticket-detail-title">
              Additional Details:
            </div>
            <div className="ticket-card__ticket-detail-content">
              {ticket_detail}
            </div>
          </div>
        </div>
      </div>
      <div className="ticket-card__footer">
        <button
          className="ticket-card__button"
          onClick={() => navigation(`/ticket/${id}`)}
        >
          <span className="ticket-card__button-icon">
            <ShoppingCartOutlined />
          </span>
          Buy Now
        </button>
      </div>
    </div>
  );
}
