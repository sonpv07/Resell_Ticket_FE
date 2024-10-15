import React, { useEffect, useState } from "react";
import "./TicketDetail.scss";
import { Skeleton, Tag } from "antd";
import { getTagColor } from "../../../utils";
import { useNavigate, useParams } from "react-router-dom";
import TicketService from "../../../services/ticket.service";
import UserService from "../../../services/user.service";
import moment from "moment";

export default function TicketDetail() {
  const navigate = useNavigate();

  const [ticketData, setTicketData] = useState(null);

  const [sellerInfo, setSellerInfo] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setSelectedQuantity(Number(e.target.value));
  };

  const handleBuyNow = () => {
    navigate("/cart", { state: { ticket: [ticketData] } });
  };

  const handleChatWithSeller = () => {
    console.log("Opening chat with seller");
    // Implement chat logic here
  };

  const fetchData = async () => {
    try {
      const response = await TicketService.getTicketDetail(id);

      console.log(response);

      if (response.success) {
        setTicketData(response.data);

        const sellerData = await UserService.getProfile(
          response.data.iD_Customer
        );

        if (sellerData.success) {
          setSellerInfo(sellerData.data);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="ticket-detail">
      <div className="ticket-detail__container">
        {/* Ticket Image Section */}
        <div className="ticket-detail__image-container">
          {isLoading ? (
            <Skeleton.Image style={{ width: 200, height: 200 }} />
          ) : (
            <img
              src={ticketData?.image}
              alt={ticketData?.event_info?.name}
              className="ticket-detail__image"
            />
          )}
        </div>

        {/* Ticket Info Section */}
        <div className="ticket-detail__info">
          <h1 className="ticket-detail__title">
            {isLoading ? (
              <Skeleton.Input active size="large" />
            ) : (
              ticketData?.show_Name
            )}
          </h1>

          {isLoading ? (
            <Skeleton.Button active />
          ) : (
            <Tag color={getTagColor(ticketData?.ticket_category)}>
              {ticketData?.ticket_category}
            </Tag>
          )}

          <div className="ticket-detail__price">
            {isLoading ? (
              <Skeleton.Input active size="large" />
            ) : (
              <>
                ${ticketData?.price}
                <span className="ticket-detail__price-note">per ticket</span>
              </>
            )}
          </div>

          <div className="ticket-detail__availability">
            {isLoading ? (
              <Skeleton.Input active />
            ) : ticketData?.quantity > 0 ? (
              <>
                <span className="ticket-detail__in-stock">In Stock</span>
                <span className="ticket-detail__stock-count">
                  {ticketData?.quantity}{" "}
                  {ticketData?.quantity === 1 ? "ticket" : "tickets"} available
                </span>
              </>
            ) : (
              <span className="ticket-detail__out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="ticket-detail__actions">
            <div className="ticket-detail__quantity">
              {isLoading ? (
                <Skeleton.Input style={{ width: 100 }} active />
              ) : (
                <>
                  <label htmlFor="quantity">Quantity:</label>
                  <select
                    id="quantity"
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    disabled={ticketData?.quantity === 0}
                  >
                    {Array.from({ length: ticketData?.quantity }).map(
                      (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      )
                    )}
                  </select>
                </>
              )}
            </div>

            {isLoading ? (
              <Skeleton.Button active />
            ) : (
              <>
                <button
                  className="ticket-detail__button ticket-detail__button--primary"
                  onClick={handleBuyNow}
                  disabled={ticketData?.quantity === 0}
                >
                  Buy Now
                </button>
                <button
                  className="ticket-detail__button ticket-detail__button--secondary"
                  disabled={ticketData?.quantity === 0}
                >
                  Create Negotiation
                </button>
                <button
                  className="ticket-detail__button ticket-detail__button--tertiary"
                  onClick={handleChatWithSeller}
                >
                  Chat with Seller
                </button>
              </>
            )}
          </div>

          {/* Seller Information Section */}
          <div className="ticket-detail__seller">
            {isLoading ? (
              <Skeleton paragraph={{ rows: 4 }} active />
            ) : (
              <>
                <h2>Seller Information: </h2>
                <p
                  className="ticket-detail__seller-name"
                  onClick={() =>
                    navigate(`/seller-profile/${sellerInfo?.iD_Customer}`)
                  }
                >
                  {sellerInfo?.name}
                </p>
                <div className="ticket-detail__seller-rating">
                  <span>Phone Number:</span> {sellerInfo?.contact}
                </div>
                <div className="ticket-detail__seller-rating">
                  <span>Email:</span> {sellerInfo?.email}
                </div>
                <div className="ticket-detail__seller-rating">
                  <span> Rating:</span>{" "}
                  {sellerInfo?.average_feedback.toFixed(1)}
                  <span className="ticket-detail__star">⭐</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Ticket Description Section */}
      <div className="ticket-detail__description">
        {isLoading ? (
          <Skeleton paragraph={{ rows: 3 }} active />
        ) : (
          <>
            <h2>Ticket Details:</h2>

            <div className="ticket-detail__description__item">
              <h3>Event Location: </h3>
              <p>{ticketData?.location}</p>
            </div>

            <div className="ticket-detail__description__item">
              <h3>Event Date: </h3>
              <p>{moment(ticketData?.event_Date).format("LLL")}</p>
            </div>

            {ticketData?.seat && (
              <div className="ticket-detail__description__item">
                <h3>Seat: </h3>
                <p>{ticketData.seat}</p>
              </div>
            )}
            <div className="ticket-detail__description__item">
              <h3>Additional Data: </h3>
              <p>{ticketData?.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
