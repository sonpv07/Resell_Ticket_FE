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
      console.error("Error get profile", error);
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
}

export default UserService;
