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
}

export default FeedbackService;
