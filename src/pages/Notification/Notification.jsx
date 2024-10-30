import React, { useContext, useEffect, useState } from "react";
import "./Notification.scss";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NotificationService from "../../services/notification.service";
import moment from "moment";

export default function Notification() {
  const { user } = useContext(AuthContext);

  const [notification, setNotification] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    const notificationResponse =
      await NotificationService.getNotificationByUser(user?.iD_Customer);

    console.log(notificationResponse);

    if (notificationResponse.success) {
      console.log(notificationResponse.data);

      const notificationData = notificationResponse.data.filter(
        (item) => item?.iD_Customer === user?.iD_Customer
      );

      setNotification(notificationData.reverse());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="notifications-list">
      <h1 className="notifications-list__title">Notifications</h1>

      {notification?.length <= 0 ? (
        <h1 className="null">No Notifications Yet</h1>
      ) : (
        <>
          <div className="notifications-list__actions">
            <button
              className="notifications-list__action-btn"
              //   onClick={markAllAsRead}
            >
              Mark all as read
            </button>
          </div>
          <div className="notifications-list__container">
            {notification.map((item) => (
              <div
                key={item.iD_Notification}
                className={`notifications-list__item ${
                  item.isRead ? "notifications-list__item--read" : ""
                }`}
                onClick={() => {
                  if (item?.iD_Order !== null) {
                    navigate("/cart", {
                      state: {
                        ticket: [
                          {
                            id: item?.iD_TicketNavigation?.iD_Ticket,
                            price: item?.iD_RequestNavigation?.price_want,
                            show_Name: item?.iD_TicketNavigation?.show_Name,
                            quantity: item?.iD_RequestNavigation?.quantity,
                            seller:
                              item?.iD_TicketNavigation?.iD_CustomerNavigation
                                .name,

                            image:
                              item?.iD_TicketNavigation?.image.split(",")[0],
                          },
                        ],
                        order: item?.iD_OrderNavigation,
                      },
                    });
                  }
                }}
              >
                <div className="notifications-list__content">
                  <p className="notifications-list__message">{item.title}</p>
                  <p className="notifications-list__date">
                    {moment(item.time_create).format("LLL")}
                  </p>
                </div>
                <div className="notifications-list__buttons">
                  <button
                    className="notifications-list__btn notifications-list__btn--delete"
                    // onClick={() => deleteNotification(notification.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
