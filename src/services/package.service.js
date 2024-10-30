// src/services/package.service.js
import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Package";

class PackageService {
  static async getPackageList() {
    try {
      const response = await api.get(`/${URL}`);
      return response.status >= 200 && response.status < 300
        ? returnValue(true, response.data, "Get Packages successfully")
        : returnValue(false, null, "Get Packages failed");
    } catch (error) {
      console.error("Error fetching package list", error);
      return returnValue(false, null, "Error fetching package list");
    }
  }

  static async createPackage(data) {
    try {
      const response = await api.post(`/${URL}`, data);
      return response.status >= 200 && response.status < 300
        ? returnValue(true, response.data, "Package created successfully")
        : returnValue(false, null, "Failed to create package");
    } catch (error) {
      console.error("Error creating package", error);
      return returnValue(false, null, "Error creating package");
    }
  }

  static async updatePackage(data) {
    try {
      const response = await api.put(`/${URL}/id`, data);
      return response?.status >= 200 && response?.status < 300
        ? returnValue(true, response, "Package updated successfully")
        : returnValue(false, null, "Failed to update package");
    } catch (error) {
      console.error("Error updating package", error);
      return returnValue(false, null, "Error updating package");
    }
  }

  static async deletePackage(id) {
    try {
      const response = await api.delete(`/${URL}/${id}`);
      return response.status >= 200 && response.status < 300
        ? returnValue(true, response.data, "Package deleted successfully")
        : returnValue(false, null, "Failed to delete package");
    } catch (error) {
      console.error("Error deleting package", error);
      return returnValue(false, null, "Error deleting package");
    }
  }
}

export default PackageService;
