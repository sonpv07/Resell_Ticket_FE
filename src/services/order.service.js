import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Order";

class OrderService {
  static async createOrder(body) {
    console.log(body);

    try {
      const response = await api.post(`${URL}`, body);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Create Order successfully");
      } else {
        return returnValue(false, null, "Create Order fail");
      }
    } catch (error) {
      console.error("Error Create Order", error);
      return returnValue(false, null, "Create Order fail");
    }
  }

  static async getOrderByUser() {
    try {
      const response = await api.get(`${URL}`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Get Order successfully");
      } else {
        return returnValue(false, null, "Get Order fail");
      }
    } catch (error) {
      return returnValue(false, null, "Get Order fail");
    }
  }
}

export default OrderService;
