// apiService.js
import axios from "axios";
import API_BASE_URL from "../utils/apiRoute";

const token = localStorage.getItem("token");

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
    // Thêm các headers khác nếu cần
  },
});

// Đặt token vào header Authorization
export const setAuthToken = (token) => {
  if (token) {
    apiService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete apiService.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

export default apiService;
