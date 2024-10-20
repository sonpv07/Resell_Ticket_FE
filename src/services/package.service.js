import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Package";

class PackageService {
  static async getAllPackage() {
    try {
      const response = await api.get(`${URL}`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Get Packages successfully");
      } else {
        return returnValue(false, null, "Get Packages fail");
      }
    } catch (error) {
      return returnValue(false, null, "Get Packages fail");
    }
  }
}

export default PackageService;
