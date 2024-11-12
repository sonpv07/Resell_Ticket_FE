import React, { useContext, useEffect, useState } from "react";
import "./TicketDetail.scss";
import { Skeleton, Tag } from "antd";
import { currencyFormatter, getTagColor } from "../../../utils";
import { useNavigate, useParams } from "react-router-dom";
import TicketService from "../../../services/ticket.service";
import UserService from "../../../services/user.service";
import moment from "moment";
import { AuthContext } from "../../../context/AuthContext";
import RequestPriceForm from "../../../components/request-price/RequestPriceForm";
import SimpleImageSlider from "react-simple-image-slider";
import FeedbackService from "../../../services/feedack.service";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { DialogContext } from "../../../context/DialogContext";

export default function TicketDetail() {
  const navigate = useNavigate();

  const [ticketData, setTicketData] = useState(null);

  const [imgList, setImgList] = useState([]);

  const [sellerInfo, setSellerInfo] = useState(null);

  const [sellerRating, setSellerRating] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [isOpenRequest, setIsOpenRequest] = useState(false);

  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const { openDialog, closeDialog } = useContext(DialogContext);

  const handleOpenDialog = () => {
    openDialog({
      title: "Alert",
      component: <p>Please Login to use further features</p>,
      okCallback: () => {
        closeDialog();
      },
      okText: "Confirm",
    });
  };

  // Function to create a new chat document with two users
  const createChat = async (user1, user2) => {
    if (!user) {
      handleOpenDialog();
      return;
    }

    try {
      const chatsRef = collection(db, "boxchat");
      const querySnapshot = await getDocs(chatsRef);

      const existingChat = querySnapshot.docs.find((doc) => {
        const users = doc.data().users;
        return (
          users.length === 2 &&
          users.some((u) => u?.iD_Customer === user1?.iD_Customer) &&
          users.some((u) => u?.iD_Customer === user2?.iD_Customer)
        );
      });

      if (existingChat) {
        navigate(`/chat`);
      } else {
        const chatDocRef = await addDoc(chatsRef, {
          users: [user1, user2],
          createdAt: serverTimestamp(),
        });
        console.log("Chat document created with ID:", chatDocRef.id);
        navigate(`/chat`);
      }
    } catch (error) {
      console.error("Error creating or checking chat document:", error);
    }
  };
  const handleQuantityChange = (e) => {
    setSelectedQuantity(Number(e.target.value));
  };

  const handleBuyNow = () => {
    if (!user) {
      handleOpenDialog();
      return;
    }

    navigate("/cart", {
      state: {
        ticket: [
          {
            id: id,
            price: ticketData.price,
            show_Name: ticketData.Show_Name,
            quantity: selectedQuantity,
            seller: ticketData.iD_CustomerNavigation.name,
            image: ticketData?.image.split(",")[0],
          },
        ],
      },
    });
  };

  const fetchData = async () => {
    try {
      const response = await TicketService.getTicketDetail(id);

      console.log(response);

      if (response.success) {
        setTicketData(response.data);
        setImgList(response.data.image.split(","));

        const sellerData = await UserService.getProfile(
          response.data.iD_Customer
        );

        if (sellerData.success) {
          setSellerInfo(sellerData.data);

          let body = {
            iD_Customer: sellerData.data.iD_Customer,
          };

          const ratingData = await FeedbackService.getSellerRating(body);

          setSellerRating(ratingData.data);
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

  console.log();

  return (
    <div className="ticket-detail">
      <div className="ticket-detail__container">
        {/* Ticket Image Section */}
        <div className="ticket-detail__image-container">
          {isLoading ? (
            <Skeleton.Image style={{ width: 400, height: 450 }} />
          ) : (
            <SimpleImageSlider
              width={400}
              height={450}
              images={imgList}
              showBullets={true}
              showNavs={true}
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
                {currencyFormatter(ticketData?.price)}
                <span className="ticket-detail__price-note">per ticket</span>
              </>
            )}
          </div>

          <div className="ticket-detail__availability">
            {isLoading ? (
              <Skeleton.Input active />
            ) : new Date(ticketData.event_Date).getTime() >
              new Date().getTime() ? (
              ticketData?.quantity > 0 ? (
                <>
                  <span className="ticket-detail__in-stock">In Stock</span>
                  <span className="ticket-detail__stock-count">
                    {ticketData?.quantity}{" "}
                    {ticketData?.quantity === 1 ? "ticket" : "tickets"}{" "}
                    available
                  </span>
                </>
              ) : (
                <span className="ticket-detail__out-of-stock">
                  Out of Stock
                </span>
              )
            ) : (
              <span className="ticket-detail__out-of-stock">
                This event is end
              </span>
            )}
          </div>

          <div className="ticket-detail__actions">
            <div className="ticket-detail__quantity">
              {ticketData?.iD_Customer === user?.iD_Customer ? (
                ""
              ) : isLoading ? (
                <Skeleton.Input style={{ width: 100 }} active />
              ) : (
                <>
                  <label htmlFor="quantity">Quantity:</label>
                  <select
                    id="quantity"
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    disabled={
                      ticketData?.quantity === 0 ||
                      ticketData?.status === "Unavailable" ||
                      new Date(ticketData.event_Date).getTime() <
                        new Date().getTime()
                    }
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

            {ticketData?.iD_Customer === user?.iD_Customer ? (
              ""
            ) : isLoading ? (
              <Skeleton.Button active />
            ) : (
              <>
                <button
                  className="ticket-detail__button ticket-detail__button--primary"
                  onClick={handleBuyNow}
                  disabled={
                    ticketData?.quantity === 0 ||
                    ticketData?.status === "Unavailable" ||
                    new Date(ticketData.event_Date).getTime() <
                      new Date().getTime()
                  }
                >
                  Buy Now
                </button>
                <button
                  className="ticket-detail__button ticket-detail__button--secondary"
                  disabled={
                    ticketData?.quantity === 0 ||
                    ticketData?.status === "Unavailable" ||
                    new Date(ticketData.event_Date).getTime() <
                      new Date().getTime()
                  }
                  onClick={() => {
                    if (!user) {
                      handleOpenDialog();
                      return;
                    }

                    setIsOpenRequest(true);
                  }}
                >
                  Create Negotiation
                </button>
                <button
                  className="ticket-detail__button ticket-detail__button--tertiary"
                  onClick={() => createChat(user, sellerInfo)}
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
                  <span> Rating:</span> {sellerRating}
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

      {isOpenRequest && (
        <RequestPriceForm
          isOpen={isOpenRequest}
          setIsOpen={setIsOpenRequest}
          ticketId={id}
          currentPrice={ticketData?.price}
          currentQuantity={ticketData?.quantity}
        />
      )}
    </div>
  );
}
