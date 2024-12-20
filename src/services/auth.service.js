import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Auth";

class AuthService {
  static async login(body) {
    try {
      const response = await api.post(`${URL}/Login`, body);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Login successfully");
      } else {
        console.error("Login fail", response.data);
      }
    } catch (error) {
      console.error("Error Login", error);
      return returnValue(false, null, "Wrong email or password");
    }
  }

  static async register(body) {
    try {
      const response = await api.post(`${URL}/Register`, body);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(
          true,
          response.data,
          "Register successfully, please confirm your email"
        );
      } else {
        console.error("Register fail", response.data);
        return returnValue(false, null, "Register failed");
      }
    } catch (error) {
      console.error("Error Register", error);
      return returnValue(false, null, "Register failed");
    }
  }

  static async loginGoogle() {
    try {
      const response = await api.get(`${URL}/login-google`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Login Google successfully");
      } else {
        console.error("Login Google fail", response.data);
        return returnValue(false, null, "Login Google failed");
      }
    } catch (error) {
      console.error("Error Register", error);
      return returnValue(false, null, "Login Google failed");
    }
  }
}

export default AuthService;