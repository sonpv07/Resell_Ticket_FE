import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Notificate";

class NotificationService {
  static async getNotificationByUser(id) {
    try {
      const response = await api.get(`${URL}`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(
          true,
          response.data,
          "Get notification successfully"
        );
      } else {
        return returnValue(false, null, "Get notification fail");
      }
    } catch (error) {
      console.error("Get notification error", error);
      return returnValue(false, null, "Get notification fail");
    }
  }

  static async createNotification(body) {
    try {
      const response = await api.post(`${URL}`, body);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(
          true,
          response.data,
          "Create notification successfully"
        );
      } else {
        return returnValue(false, null, "Create notification fail");
      }
    } catch (error) {
      console.error("Create notification error", error);
      return returnValue(false, null, "Create notification fail");
    }
  }
}

export default NotificationService;
