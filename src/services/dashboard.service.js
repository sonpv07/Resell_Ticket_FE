// src/services/dashboard.service.js

import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = {
  CUSTOMER: "Customer",
  ORDER: "Order",
  PACKAGE: "Package",
  TICKET: "Ticket"
};

class DashboardService {
  static async getTotalCustomer() {
    try {
      const response = await api.get(`${URL.CUSTOMER}/total-customer`);
      return response.status >= 200 && response.status < 300
        ? returnValue(true, response.data, "Fetched total customer count successfully")
        : returnValue(false, null, "Failed to fetch total customer count");
    } catch (error) {
      console.error("Error fetching total customer count:", error);
      return returnValue(false, null, "Error fetching total customer count");
    }
  }

  static async getTotalOrder() {
    try {
      const response = await api.get(`${URL.ORDER}/count-all-order`);
      return response.status >= 200 && response.status < 300
        ? returnValue(true, response.data, "Fetched total order count successfully")
        : returnValue(false, null, "Failed to fetch total order count");
    } catch (error) {
      console.error("Error fetching total order count:", error);
      return returnValue(false, null, "Error fetching total order count");
    }
  }

  static async getTotalPackage() {
    try {
      const response = await api.get(`${URL.PACKAGE}/total-package`);
      return response.status >= 200 && response.status < 300
        ? returnValue(true, response.data, "Fetched total package count successfully")
        : returnValue(false, null, "Failed to fetch total package count");
    } catch (error) {
      console.error("Error fetching total package count:", error);
      return returnValue(false, null, "Error fetching total package count");
    }
  }

  static async getTotalTicket() {
    try {
      const response = await api.get(`${URL.TICKET}/total-ticket-available`);
      return response.status >= 200 && response.status < 300
        ? returnValue(true, response.data, "Fetched total ticket count successfully")
        : returnValue(false, null, "Failed to fetch total ticket count");
    } catch (error) {
      console.error("Error fetching total ticket count:", error);
      return returnValue(false, null, "Error fetching total ticket count");
    }
  }


  static async getNewCustomers() {
    try {
      const response = await api.get(`${URL.CUSTOMER}/new-7-customer`);
      if (response.status >= 200 && response.status < 300) {
        console.log("API response data:", response.data); // Kiểm tra dữ liệu trả về
        // Lọc và chỉ lấy các trường cần thiết
        const data = response.data.map(user => ({
          iD_Customer: user.iD_Customer,
          name: user.name,
          contact: user.contact,
          email: user.email,
          average_feedback: user.average_feedback,
          avatar: user.avatar  
        }));
        return returnValue(true, data, "Fetched new customers successfully");
      } else {
        return returnValue(false, null, "Failed to fetch new customers");
      }
    } catch (error) {
      console.error("Error fetching new customers:", error);
      return returnValue(false, null, "Error fetching new customers");
    }
  }
  


  static async getMonthlyPackageProfit(month, year) {
    try {
      const response = await api.get(`${URL.CUSTOMER}/Total-price-package-by-month-year`, {
        params: { month, year }
      });
      return response.status >= 200 && response.status < 300
        ? returnValue(true, response.data, "Fetched monthly package profit successfully")
        : returnValue(false, null, "Failed to fetch monthly package profit");
    } catch (error) {
      console.error("Error fetching monthly package profit:", error);
      return returnValue(false, null, "Error fetching monthly package profit");
    }
  }
}

export default DashboardService;
