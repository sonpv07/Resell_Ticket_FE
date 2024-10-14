import axios from "axios";

// API TEST
// const baseUrl = "https://catfact.ninja/";

const baseUrl = 'http://14.225.204.144:7070/api';

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

const API_URL = 'http://14.225.204.144:7070/api';


export const getCompletedOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders?status=success`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching completed orders', error);
    throw error;
  }
};

// Gửi phản hồi cho đơn hàng
export const sendFeedback = async (orderId, feedbackData) => {
  try {
    const response = await axios.post(`${API_URL}/feedback/${orderId}`, feedbackData);
    return response.data; // Trả về phản hồi từ API
  } catch (error) {
    console.error('Error sending feedback', error);
    throw error;
  }
};

export default api;
