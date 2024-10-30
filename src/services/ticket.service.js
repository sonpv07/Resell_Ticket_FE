// src/services/ticket.service.js
import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Ticket";

class TicketService {
  static async fetchTickets() {
    try {
      const response = await api.get(`/${URL}`);
      return response.status >= 200 && response.status < 300
        ? returnValue(true, response.data, "Get Tickets successfully")
        : returnValue(false, null, "Get Tickets failed");
    } catch (error) {
      console.error("Error fetching ticket list", error);
      return returnValue(false, null, "Error fetching ticket list");
    }
  }

  static async updateTicketStatus(id, status) {
    try {
      const response = await api.put(`/${URL}`, { iD_Ticket: id, status: status });
      return response.status >= 200 && response.status < 300
        ? returnValue(true, response.data, "Status updated successfully")
        : returnValue(false, null, "Failed to update status");
    } catch (error) {
      console.error("Error updating ticket status", error);
      return returnValue(false, null, "Error updating ticket status");
    }
  }
  
}

export default TicketService;
