const API_BASE_URL = "http://localhost:3000";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/sign-in`,
    REGISTER: `${API_BASE_URL}/auth/sign-up`,
    OTP: `${API_BASE_URL}/auth/send-otp`,
    OTP_VERIFY: `${API_BASE_URL}/auth/verified-otp`,
    CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`
  },
  USER: {
    BASE: `${API_BASE_URL}/user`,
    GET_CURRENT_USER: `${API_BASE_URL}/user/get-user-token`
  },
  PRODUCT: {
    BASE: `${API_BASE_URL}/product`
  },
  CATEGORY: {
    BASE: `${API_BASE_URL}/category`
  },
  UPLOAD: {
    AVATAR: `${API_BASE_URL}/uploads/avatar`
  },
  CART: {
    BASE: `${API_BASE_URL}/cart`,
    ADD_TO_CART: `${API_BASE_URL}/cart/add-to-cart`
  }
};// nơi khai báo các enpoint route

export default API_BASE_URL;
