import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Change to the backend's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include JWT token in headers if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
