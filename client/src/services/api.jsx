import axios from 'axios';

// Create an axios instance with the base URL of your backend
const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Matches your server port
});

// Optional: Add a request interceptor to attach the admin token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;