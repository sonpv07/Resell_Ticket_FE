import returnValue from "../utils";
import api from "./axios/axios";

const URL = "packages"; // Endpoint cho packages

class PackageService {
  static async getPackageList() {
    try {
      const response = await api.get(`${URL}`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(
          true,
          response.data,
          "Fetch package list successfully"
        );
      } else {
        console.error("Failed to fetch packages", response.data);
        return returnValue(false, null, "Failed to fetch packages");
      }
    } catch (error) {
      console.error("Error fetching package list", error);
      return returnValue(false, null, "Error fetching package list");
    }
  }

  static async getPackageById(id) {
    try {
      const response = await api.get(`${URL}/${id}`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(
          true,
          response.data,
          "Fetch package details successfully"
        );
      } else {
        console.error("Failed to fetch package", response.data);
        return returnValue(false, null, "Failed to fetch package");
      }
    } catch (error) {
      console.error("Error fetching package", error);
      return returnValue(false, null, "Error fetching package");
    }
  }
}

export default PackageService;
