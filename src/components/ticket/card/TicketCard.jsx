import React from "react";
import "./TicketCard.scss";
import { Skeleton, Tag } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { getTagColor } from "../../../utils";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function TicketCard({
  iD_Ticket,
  price,
  show_Name,
  ticket_type,
  ticket_category,
  quantity,
  description,
  event_Date,
  isLoading,
}) {
  // const availableQuantity = quantity - soldQuantity;

  const navigation = useNavigate();

  return (
    // <div className="ticket-card">
    //   <div className="ticket-card__header">
    //     <div className="ticket-card__title">
    //       <Tag color={getTagColor(ticket_category)}>{ticket_category}</Tag>
    //       Ticket
    //     </div>

    //     <div className="ticket-card__title">
    //       <Tag color={ticket_type ? "green" : "#f44336"}>
    //         {ticket_type ? "Can Negotiate" : "No Negotiate"}
    //       </Tag>
    //     </div>
    //   </div>
    //   <div className="ticket-card__content">
    //     <div className="ticket-card__name">
    //       <h2>{show_Name}</h2>
    //     </div>
    //     <p className="ticket-card__date">
    //       {moment(event_Date).format("MMM Do YY")}
    //     </p>

    //     <div className="ticket-card__price">
    //       <span className="ticket-card__currency">$</span>
    //       {price}

    //       <span className="ticket-card__price-note">per ticket</span>
    //     </div>
    //     <div className="ticket-card__availability">
    //       <div className="ticket-card__availability-row">
    //         <span>Available</span>
    //         <span className="ticket-card__availability-number">{quantity}</span>
    //       </div>
    //       {/* <div className="ticket-card__progress-bar">
    //         <Progress
    //           showInfo={false}
    //           strokeColor={"#4caf50"}
    //           trailColor="#e0e0e0"
    //           percent={soldPercentage}
    //         />
    //       </div> */}
    //       {/* <div className="ticket-card__availability-row">
    //         <span>Sold</span>
    //         <span className="ticket-card__availability-number">
    //           {soldQuantity} of {quantity}
    //         </span>
    //       </div> */}

    //       {/* <div className="ticket-card__seller-info">
    //         <span className="ticket-card__seller-name">
    //           Seller: <span>{seller_info.name}</span>
    //         </span>
    //         <div className="ticket-card__seller-rating">
    //           Rating: {seller_info.rating.toFixed(1)}
    //           <span className="ticket-card__star">
    //             <StarFilled style={{ color: "yellow" }} />
    //           </span>
    //         </div>
    //       </div> */}

    //       <div className="ticket-card__ticket-detail">
    //         <div className="ticket-card__ticket-detail-title">
    //           Additional Details:
    //         </div>
    //         <div className="ticket-card__ticket-detail-content">
    //           {description}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="ticket-card__footer">
    //     <button
    //       className="ticket-card__button"
    //       onClick={() => navigation(`/ticket/${iD_Ticket}`)}
    //     >
    //       <span className="ticket-card__button-icon">
    //         <ShoppingCartOutlined />
    //       </span>
    //       Buy Now
    //     </button>
    //   </div>
    // </div>

    <div className="ticket-card">
      {isLoading ? (
        // Display Skeleton placeholders while loading
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          <div className="ticket-card__header">
            <div className="ticket-card__title">
              <Tag color={getTagColor(ticket_category)}>{ticket_category}</Tag>
              Ticket
            </div>

            <div className="ticket-card__title">
              <Tag color={ticket_type ? "green" : "#f44336"}>
                {ticket_type ? "Can Negotiate" : "No Negotiate"}
              </Tag>
            </div>
          </div>

          <div className="ticket-card__content">
            <div className="ticket-card__name">
              <h2>{show_Name}</h2>
            </div>
            <p className="ticket-card__date">
              {moment(event_Date).format("MMM Do YY")}
            </p>

            <div className="ticket-card__price">
              <span className="ticket-card__currency">$</span>
              {price}
              <span className="ticket-card__price-note">per ticket</span>
            </div>
            <div className="ticket-card__availability">
              <div className="ticket-card__availability-row">
                <span>Available</span>
                <span className="ticket-card__availability-number">
                  {quantity}
                </span>
              </div>

              <div className="ticket-card__ticket-detail">
                <div className="ticket-card__ticket-detail-title">
                  Additional Details:
                </div>
                <div className="ticket-card__ticket-detail-content">
                  {description}
                </div>
              </div>
            </div>
          </div>
          <div className="ticket-card__footer">
            <button
              className="ticket-card__button"
              onClick={() => navigation(`/ticket/${iD_Ticket}`)}
            >
              <span className="ticket-card__button-icon">
                <ShoppingCartOutlined />
              </span>
              Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}
