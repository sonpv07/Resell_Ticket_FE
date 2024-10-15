import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Report";

class ReportService {
  static async sendReport(body) {
    try {
      const response = await api.post(`${URL}`, body);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Send Report successfully");
      } else {
        return returnValue(false, null, "Send Report fail");
      }
    } catch (error) {
      console.error("Error Login", error);
      return returnValue(false, null, "Send Report fail");
    }
  }
}

export default ReportService;
