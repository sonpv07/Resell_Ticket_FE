import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Request"; // Assuming "RequestPrice" is the correct endpoint

class RequestPriceService {
  // Function to send a new request price
  static async sendRequestPrice(requestData) {
    try {
      const response = await api.post(`${URL}`, requestData);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(
          true,
          response.data,
          "Request price submitted successfully"
        );
      } else {
        return returnValue(false, null, "Failed to submit request price");
      }
    } catch (error) {
      console.error("Error sending request price", error);
      return returnValue(false, null, "Error sending request price");
    }
  }

  // Function to get request price details by ID
  static async getRequestPrice(id) {
    try {
      const response = await api.get(`${URL}/sellerId?sellerId=${id}`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "");
      } else {
        return returnValue(false, null, "Failed to retrieve request price");
      }
    } catch (error) {
      console.error("Error fetching request price", error);
      return returnValue(false, null, "Error fetching request price");
    }
  }

  // Function to edit an existing request price
  static async editRequestPrice(id, updatedData) {
    try {
      const response = await api.put(`${URL}/${id}`, updatedData);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(
          true,
          response.data,
          "Request price updated successfully"
        );
      } else {
        return returnValue(false, null, "Failed to update request price");
      }
    } catch (error) {
      console.error("Error updating request price", error);
      return returnValue(false, null, "Error updating request price");
    }
  }
}

export default RequestPriceService;
