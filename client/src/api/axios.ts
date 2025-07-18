import axios from "axios";
import { ENV } from "../config/env";

const axiosInstance = axios.create({
  baseURL: ENV.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // change to true if using cookies/sessions later
});

export default axiosInstance;
