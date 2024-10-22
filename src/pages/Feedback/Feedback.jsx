import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sendFeedback } from "../../services/axios/axios";
import "./Feedback.scss";
import FeedbackService from "../../services/feedack.service";
import { Rate } from "antd";
import { toast } from "react-toastify";

const feedbackService = new FeedbackService("http://14.225.204.144:7070/api/");

const Feedback = () => {
  const { orderId } = useParams();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {
      iD_Order: orderId,
      stars: rating,
      comment: feedback,
    };

    const response = await FeedbackService.createFeedback(body);

    if (response.success) {
      toast.success(response.message);
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

  console.log(rating);

  return (
    <div className="feedback-container">
      <h1> Leave Feedback for Order {orderId}</h1>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="feedback-form__item">
          <label>Rating:</label>
          <Rate allowHalf onChange={(value) => setRating(value)} />
        </div>

        <div className="feedback-form__item">
          <label>Feedback:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            className="feedback-form__textarea"
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
