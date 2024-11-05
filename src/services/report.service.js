import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Report";

class ReportService {
  static async sendReport(body) {
    console.log(body);

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

  static async getReports() {
    try {
      const response = await api.get(`${URL}`);

      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Get Report successfully");
      } else {
        return returnValue(false, null, "Get Report fail");
      }
    } catch (error) {
      console.error("Error Report", error);
      return returnValue(false, null, "Get Report fail");
    }
  }
}

export default ReportService;
