import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Firebase";

class FirebaseService {
  static async uploadImage(body) {
    console.log(body);

    try {
      const response = await api.post(`${URL}/upload`, body);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Upload Image successfully");
      } else {
        return returnValue(false, null, "Upload Image fail");
      }
    } catch (error) {
      console.error("Error Upload Image", error);
      return returnValue(false, null, "Upload Image fail");
    }
  }
}

export default FirebaseService;
