import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Customer";

class UserService {
  static async getProfile(id) {
    try {
      const response = await api.get(`${URL}/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "");
      } else {
        return returnValue(false, null, "");
      }
    } catch (error) {
      console.error("Error Login", error);
    }
  }

  static async editProfile(values) {
    try {
      console.log(values);

      const response = await api.put(`${URL}`, values);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Update profile successfully");
      } else {
        return returnValue(false, null, "Update profile failed");
      }
    } catch (error) {
      console.error("Error Edit Profile", error);
      return returnValue(false, error, "Update profile failed");
    }
  }

  static async getProfileList() {
    try {
      const response = await api.get(`/${URL}`);
      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Fetched user profiles successfully");
      } else {
        return returnValue(false, null, "Failed to fetch user profiles");
      }
    } catch (error) {
      console.error("Error fetching user profiles", error);
      return returnValue(false, error, "Error fetching user profiles");
    }
  }

  
}

export default UserService;
