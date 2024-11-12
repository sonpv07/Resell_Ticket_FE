import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sendFeedback } from "../../services/axios/axios";
import "./Feedback.scss";
import FeedbackService from "../../services/feedack.service";
import { Rate } from "antd";
import { toast } from "react-toastify";
import Overlay from "../../components/overlay/Overlay";

const Feedback = ({
  isOpen,
  setIsOpen,
  orderId,
  feedbackData,
  orderList,
  setOrderList,
}) => {
  const [feedback, setFeedback] = useState(feedbackData?.comment ?? "");
  const [rating, setRating] = useState(feedbackData?.stars ?? 0);
  const [loading, setLoading] = useState(false);

  // console.log(orderList);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {
      iD_Order: orderId,
      stars: rating,
      comment: feedback,
    };

    const response = await FeedbackService.createFeedback(body);

    if (response.success) {
      const orderClone = [...orderList];

      const index = orderClone.findIndex((order) => order.iD_Order === orderId);

      if (index >= 0) {
        orderClone[index].feedback = response.data;
        setOrderList(orderClone);
        setIsOpen(false);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } else {
      toast.error(response.message);
    }

    // try {
    //   const feedbackData = {
    //     stars: rating,
    //     comment: feedback,
    //   };
    //   await sendFeedback(orderId, feedbackData);

    //   alert("Feedback sent successfully!");
    //   navigate("/OrderHistory");
    // } catch (error) {
    //   console.error("Error sending feedback:", error);
    //   alert("Failed to send feedback. Please try again.");
    // }
  };

  return (
    <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="feedback-container">
        <h1 className="feedback-container__title">
          {feedbackData !== null ? "Your" : "Leave"} Feedback for Order{" "}
          {orderId}
        </h1>
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="feedback-form__item">
            <label>Rating:</label>
            <Rate
              onChange={(value) => setRating(value)}
              disabled={feedbackData !== null || loading}
              value={rating}
            />
          </div>

          <div className="feedback-form__item">
            <label>Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              className="feedback-form__textarea"
              rows={5}
              disabled={feedbackData !== null || loading}
            />
          </div>

          {!feedbackData && (
            <button
              type="submit"
              className="submit-btn"
              disabled={feedbackData !== null || loading}
            >
              Submit Feedback
            </button>
          )}
        </form>
      </div>
    </Overlay>
  );
};

export default Feedback;
