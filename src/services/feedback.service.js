// import axios from 'axios'; 

import api from "./axios/axios";

class FeedbackService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async sendFeedback(feedbackData) {
    try {
      const response = await api.post(`${this.baseUrl}/Feedback`, feedbackData); 
      return response.data;
    } catch (error) {
      console.error('Error sending feedback', error);
      throw error;
    }
  }
}

export default FeedbackService;
