import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaUser } from 'react-icons/fa';
import FeedbackService from '../../services/feedback.service';  
import './Feedback.scss';

const feedbackService = new FeedbackService('http://14.225.204.144:7070/api/');  

const Feedback = () => {
  const { orderId } = useParams();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const feedbackData = {
        orderId,  
        comment: feedback,
        stars: rating
      };
      await feedbackService.sendFeedback(feedbackData);  

      alert('Feedback sent successfully!');
      navigate('/OrderHistory');
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Failed to send feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-container">
      <h1><FaUser /> Leave Feedback for Order {orderId}</h1>
      <form onSubmit={handleSubmit} className="feedback-form">
        <label className="feedback-form__label">
          Rating:
          <div className="rating-stars">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`star ${index < rating ? 'filled' : ''}`}
                onClick={() => handleRatingClick(index + 1)}
              />
            ))}
          </div>
        </label>

        <label className="feedback-form__label">
          Feedback:
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            className="feedback-form__textarea"
          />
        </label>

        <button type="submit" className="feedback-form__submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
