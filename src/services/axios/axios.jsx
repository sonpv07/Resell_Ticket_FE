import axios from "axios";

// API LOCAL
// const baseUrl = "http://localhost:5212/api/";

const baseUrl = "http://14.225.204.144:7070/api/";

const config = {
  baseUrl: baseUrl,
};

const api = axios.create(config);

api.defaults.baseURL = baseUrl;

const handleBefore = (config) => {
  const token = localStorage.getItem("token")?.replaceAll('"', "");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};

api.interceptors.request.use(handleBefore, null);

export const getCompletedOrders = async () => {
  try {
    const response = await axios.get(`${baseUrl}/orders?status=success`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching completed orders', error);
    throw error;
  }
};


export const sendFeedback = async (orderId, feedbackData) => {
  try {
    const response = await axios.post(`${baseUrl}/feedback/${orderId}`, feedbackData);
    return response.data; 
  } catch (error) {
    console.error('Error sending feedback', error);
    throw error;
  }
};

export default api;
