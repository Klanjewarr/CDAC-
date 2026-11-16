import axios from "axios";

export const API_URL = "http://localhost:5000/api";
export const BACKEND_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
});

// Attach Bearer JWT token to outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("job_portal_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for session expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url?.includes("/auth/login")) {
      // Token expired or invalid
      localStorage.removeItem("job_portal_token");
      localStorage.removeItem("job_portal_user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login?expired=true";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
