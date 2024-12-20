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

  static async filterTicket(location, ticketCategory, price, show_Name) {
    try {
      const queryParams = [
        ticketCategory ? `ticketCategory=${ticketCategory}` : "",
        location ? `location=${location}` : "",
        price ? `price=${price}` : "",
        show_Name ? `show_name=${show_Name}` : "",
      ]
        .filter(Boolean)
        .join("&");

      const response = await api.get(`${URL}/filter?${queryParams}`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Filter Ticket Success");
      } else {
        return returnValue(false, null, "Filter Ticket Failure");
      }
    } catch (error) {
      return returnValue(false, null, "Filter Ticket Failure");
    }
  }

  static async createTicket(sellerId, body) {
    try {
      const response = await api.post(`${URL}/${sellerId}`, body);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Create Ticket Success");
      } else {
        return returnValue(false, null, "Create Ticket Failure");
      }
    } catch (error) {
      return returnValue(false, null, "Create Ticket Failure");
    }
  }

  static async deleteTicket(id) {
    try {
      const response = await api.delete(`${URL}/${id}`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Delete Ticket Success");
      } else {
        return returnValue(false, null, "Delete Ticket Failure");
      }
    } catch (error) {
      return returnValue(false, null, "Delete Ticket Failure");
    }
  }

  static async editTicket(body) {
    try {
      const response = await api.put(`${URL}`, body);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Edit Ticket Success");
      } else {
        return returnValue(false, null, "Edit Ticket Failure");
      }
    } catch (error) {
      return returnValue(false, null, "Edit Ticket Failure");
    }
  }
}

export default TicketService;
