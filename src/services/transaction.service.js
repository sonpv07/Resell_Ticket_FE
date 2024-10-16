import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Transaction";

class TransactionService {
  static async createPayment(body) {
    try {
      const response = await api.post(
        `http://14.225.204.144:7070/create/payment`,
        body
      );

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Create Payment successfully");
      } else {
        return returnValue(false, null, "Create Payment fail");
      }
    } catch (error) {
      console.error("Error Login", error);
      return returnValue(false, null, "Create Payment fail");
    }
  }
}

export default TransactionService;
