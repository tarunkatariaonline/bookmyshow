// src/api/axios.js
import axios from "axios";

const baseURL = ["https://api.example.com", "prod"];
const api = axios.create({
  baseURL: baseURL[0], // your API base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Optional: response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // global error handling
    if (error.response?.status === 401) {
      console.log("Unauthorized");
    }
    return Promise.reject(error);
  },
);

export default api;
