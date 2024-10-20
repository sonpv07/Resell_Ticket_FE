import axios from "axios";

// API LOCAL
const baseUrl = "http://localhost:5212/api/";

// const baseUrl = "http://14.225.204.144:7070/api/";

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

export const getCustomerOrders = async (customerId) => {
  try {
    const response = await axios.get(`${baseUrl}/orders`, {
      params: {
        status: 'success',
        customerId: customerId, 
      },
    });
    console.log('Response from customer orders:', response); 
    return response.data;
  } catch (error) {
    console.error('Error fetching customer orders:', error.response?.data || error.message); 
    throw error;
  }
};




export default api;
