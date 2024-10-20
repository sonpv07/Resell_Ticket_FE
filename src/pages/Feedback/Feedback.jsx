import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { sendFeedback } from '../../services/axios/axios';
import './Feedback.scss';

const Feedback = () => {
  const { orderId } = useParams();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const feedbackData = {
        rating: parseInt(rating, 10),
        feedback,
      };
      await sendFeedback(orderId, feedbackData);

      alert('Feedback sent successfully!');
      navigate('/OrderHistory');
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Failed to send feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-container">
      <h1>Leave Feedback for Order {orderId}</h1>
      <form onSubmit={handleSubmit} className="feedback-form">
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value={5}>5 - Excellent</option>
            <option value={4}>4 - Good</option>
            <option value={3}>3 - Average</option>
            <option value={2}>2 - Poor</option>
            <option value={1}>1 - Terrible</option>
          </select>
        </label>

        <label>
          Feedback:
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
