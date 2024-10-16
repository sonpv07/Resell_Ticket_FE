import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Order";

class OrderService {
  static async createOrder(body) {
    try {
      const response = await api.post(`${URL}`, body);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Create Order successfully");
      } else {
        return returnValue(false, null, "Create Order fail");
      }
    } catch (error) {
      console.error("Error Login", error);
      return returnValue(false, null, "Create Order fail");
    }
  }

  static async getOrderByUser(body) {
    try {
      const response = await api.post(
        `http://14.225.204.144:7070/create/order`,
        body
      );

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Create Order successfully");
      } else {
        return returnValue(false, null, "Create Order fail");
      }
    } catch (error) {
      console.error("Error Login", error);
      return returnValue(false, null, "Create Order fail");
    }
  }
}

export default OrderService;
