import axios from "axios";
import { getToken } from "../utils/token";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "http://18.224.180.211:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;