import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Transaction";

class TransactionService {
  static async createPayment(body) {
    try {
      const response = await api.post(
        `https://localhost:7216/create/payment`,
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

  static async createPaymentPayOS(body) {
    try {
      const response = await api.post(`${URL}/create-payment-link`, body);

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

  static async getTransactionByUser(userId) {
    try {
      const response = await api.get(
        `${URL}/customerId?customerId=${userId}&transactionType=Package`
      );

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "get Payment successfully");
      } else {
        return returnValue(false, null, "get Payment fail");
      }
    } catch (error) {
      console.error("Error Login", error);
      return returnValue(false, null, "get Payment fail");
    }
  }
  static async updateTransaction(orderId, responseCode) {
    try {
      const response = await api.put(
        `${URL}/PayOSTransaction?orderId=${orderId}&responseCode=${responseCode}`,
        {}
      );

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "get Payment successfully");
      } else {
        return returnValue(false, null, "get Payment fail");
      }
    } catch (error) {
      console.error("Error Login", error);
      return returnValue(false, null, "get Payment fail");
    }
  }
}

export default TransactionService;
