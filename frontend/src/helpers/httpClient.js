import axios from "axios";

export const httpClient = axios.create();

// Request interceptor to attach token
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Auto-logout or redirect
      localStorage.removeItem("userToken");
      window.location.href = "/"; // adjust route as needed
    }
    return Promise.reject(error);
  }
);
