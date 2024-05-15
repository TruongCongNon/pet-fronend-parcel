import React, { useState, useContext } from "react";
import { DataContext } from "../utils/dataContext"; // Import DataContext từ file chứa context
import apiService from "../service/apiService";
import { API_ENDPOINTS } from "../utils/apiRoute";
import { useHistory } from "react-router-dom/cjs/react-router-dom";


function Otp() {
  const history = useHistory(); // cái này để điều hướng cho nút button
  const [email, setEmail] = useState(""); //cái này để lấy giá trị từ các ô input
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { setData } = useContext(DataContext); // Sử dụng setData từ DataContext

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  }; // hàm này là lấy value từ ô iput gắn lên cái mớ ở trên

  const sendOtp = async (event) => {
    event.preventDefault(); // ngăn ko cho nút button chuyển trang bậy bạ
    setLoading(true);
    const response = await apiService.post(API_ENDPOINTS.AUTH.OTP, { email });
    setLoading(false);
    if (response.status === 201) {
      alert("OTP sent successfully");
    } else {
      alert("OTP sent failed");
    }
  }; //hàm call otp

  const verifiedOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await apiService.post(API_ENDPOINTS.AUTH.OTP_VERIFY, {
      email,
      otp,
    });
    setLoading(false);
    if (response.status === 201) {
      setData(email); // Lưu email vào context để mang các dữ liệu qua các page khác (hoặc all page) <ở đây là trang register>
      history.push("/register"); // chuyển trang
    } else {
      alert("OTP verified failed");
    }
  }; // call api xác thực

  return (
    <div>
      <div className={`login-page ${loading ? "loading-overlay" : ""}`}>
        <div class="form">
          <form class="register-form">
            <h2>
              <i class="fas fa-lock"></i> Xác nhận mã Otp
            </h2>
            <div class="d-flex mt-4 mb-4">
              <input
                type="email"
                style={{ margin: "0 10px 0 0" }}
                placeholder="Email *"
                value={email}
                onChange={handleEmailChange} // gắn hàm lấy value input
                id="email"
              />
              <button id="send-otp" onClick={sendOtp}>
                Nhận mã OTP
              </button>
            </div>

            <input
              class="input-login"
              type="text"
              placeholder="Mã OTP *"
              onChange={handleOtpChange}
            />
            <button class="btn-otp mt-2" type="submit" onClick={verifiedOtp}>
              Tiếp theo
            </button>
            <p class="message">
              Bạn đã có tài khoản? <a href="./login">Đăng nhập</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Otp;
