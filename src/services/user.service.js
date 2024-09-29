import returnValue from "../utils";
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
}

export default UserService;
