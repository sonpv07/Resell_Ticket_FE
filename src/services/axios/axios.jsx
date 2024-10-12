import axios from 'axios';

// Create an axios instance
const instance = axios.create({
  baseURL: 'http://14.225.204.144:7070/api',  // API base URL
  timeout: 5000,  // Set timeout
  headers: {
    'Content-Type': 'multipart/form-data'  // If you're sending FormData
  }
});



export default instance;
