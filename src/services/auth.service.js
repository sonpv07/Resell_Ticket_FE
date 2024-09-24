import api from "./axios/axios";

const URL = "auth";

class AuthService {
  static async login(body) {
    try {
      const response = await api.post(`${URL}/login`, body);

      if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
        return response.data;
      } else {
        console.error("Login fail", response.data);
      }
    } catch (error) {
      console.error("Error Login", error);
    }
  }
}

export default AuthService;
