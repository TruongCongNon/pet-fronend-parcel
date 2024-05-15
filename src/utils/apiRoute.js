// constants.js
// const API_BASE_URL = "http://10.147.19.99:3000";
const API_BASE_URL = "http://localhost:3000";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/sign-in`,
    REGISTER: `${API_BASE_URL}/auth/sign-up`,
    OTP: `${API_BASE_URL}/auth/send-otp`,
    OTP_VERIFY: `${API_BASE_URL}/auth/verified-otp`,
  },
  USER:{
    BASE: "/user",
    GET_CURRENT_USER: `${API_BASE_URL}/user/get-user-token`
  },
  PRODUCT: {
    BASE: "/product"
  }
};// nơi khai báo các enpoint route

export default API_BASE_URL;
