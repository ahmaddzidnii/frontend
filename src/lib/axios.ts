import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:1001",
  timeout: 10000,
  withCredentials: true,
});
