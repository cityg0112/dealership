import axios from 'axios';

// Use the environment variable if it exists (Vercel), otherwise fallback to localhost
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

export default api;