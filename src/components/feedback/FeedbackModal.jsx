import React, { useEffect, useState } from "react";
import "./FeedbackModal.scss";
import { Rating } from "@mui/material";
import Overlay from "../overlay/Overlay";
import UserService from "../../services/user.service";

const FeedbackModal = ({ isOpen, setIsOpen, orderFeedback }) => {
  const [author, setAuthor] = useState(null);

  const fetchAuthor = async () => {
    console.log(orderFeedback);

    const response = await UserService.getProfile(
      orderFeedback?.iD_OrderNavigation?.iD_Customer
    );

    console.log(response);

    if (response?.success) {
      setAuthor(response.data);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, [orderFeedback]);

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="feedback-modal">
        <div className="feedback-modal__content">
          <h2 className="feedback-modal__title">Order Feedback</h2>

          <div className="feedback-modal__list">
            <div className="feedback-modal__item">
              <div className="feedback-modal__meta">
                <img
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                  src={author?.avatar}
                  alt="Avatar"
                />
                <p className="feedback-modal__author">{author?.name}</p>
              </div>

              <div className="feedback-modal__rating">
                <Rating value={orderFeedback.stars} disabled />
              </div>
              <p className="feedback-modal__comment">{orderFeedback.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default FeedbackModal;
