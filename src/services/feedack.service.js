import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Feedback";

class FeedbackService {
  static async createFeedback(body) {
    console.log(body);

    try {
      const response = await api.post(`${URL}`, body);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Create Feedback successfully");
      } else {
        return returnValue(false, null, "Create Feedback fail");
      }
    } catch (error) {
      console.error("Error Create Feedback", error);
      return returnValue(false, null, "Create Feedback fail");
    }
  }

  static async getFeedbackByCustomer(customerId) {
    try {
      const response = await api.get(
        `${URL}/customer-received-feedbacks?customerId=${customerId}`
      );

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Get Feedback successfully");
      } else {
        return returnValue(false, null, "Get Feedback fail");
      }
    } catch (error) {
      console.error("Error Create Feedback", error);
      return returnValue(false, null, "Get Feedback fail");
    }
  }

  static async getSellerRating(body) {
    try {
      const response = await api.post(`${URL}/average-feedback`, body);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "");
      } else {
        return returnValue(false, null, "");
      }
    } catch (error) {
      console.error("Error Get average", error);
    }
  }
  static async getAllFeedback() {
    try {
      const response = await api.get(`${URL}`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "");
      } else {
        return returnValue(false, null, "");
      }
    } catch (error) {
      console.error("Error Get average", error);
    }
  }
}

export default FeedbackService;
