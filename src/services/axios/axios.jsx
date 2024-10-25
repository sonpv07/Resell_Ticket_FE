import axios from "axios";

// API LOCAL
// const baseUrl = "http://localhost:5212/api/";
// const baseUrl = "https://localhost:7216/api/";

const baseUrl = "http://14.225.204.144:7070/api/";

// HTTPS SERVER
// const baseUrl = "https://swp.vinhuser.one/api/";

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

export default api;
