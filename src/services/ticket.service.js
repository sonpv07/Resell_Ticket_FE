import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Ticket";

class TicketService {
  static async getTicketList() {
    try {
      const response = await api.get(`${URL}`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Get Ticket List Success");
      } else {
        return returnValue(false, null, "Get Ticket List Failure");
      }
    } catch (error) {
      return returnValue(false, null, "Get Ticket List Failure");
    }
  }

  static async getTicketDetail(id) {
    try {
      const response = await api.get(`${URL}/${id}`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Get Ticket Success");
      } else {
        return returnValue(false, null, "Get Ticket Failure");
      }
    } catch (error) {
      return returnValue(false, null, "Get Ticket Failure");
    }
  }

  static async getTicketListBySeller(sellerId) {
    try {
      const response = await api.get(`${URL}/ticket/${sellerId}`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(
          true,
          response.data,
          "Get Ticket List By User Success"
        );
      } else {
        return returnValue(false, null, "Get Ticket List By User Failure");
      }
    } catch (error) {
      return returnValue(false, null, "Get Ticket List By User Failure");
    }
  }

  static async filterTicket(location, ticketCategory) {
    try {
      const response = await api.get(
        `${URL}/filter?ticketCategory=${ticketCategory}&location=${location}}`
      );

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Filter Ticket Success");
      } else {
        return returnValue(false, null, "Filter Ticket Failure");
      }
    } catch (error) {
      return returnValue(false, null, "Filter Ticket Failure");
    }
  }
}

export default TicketService;
