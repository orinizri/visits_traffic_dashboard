import axios from "axios";
import { ENV } from "../config/env";
import { getCachedToken } from "../utils/tokenManager";

const axiosInstance = axios.create({
  baseURL: ENV.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // change to true if using cookies/sessions later
});

// 🧠 Intercept *before* every request and attach fresh token
axiosInstance.interceptors.request.use(
  async config => {
    const token = await getCachedToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
