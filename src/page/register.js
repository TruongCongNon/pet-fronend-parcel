import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../utils/dataContext";
import { API_ENDPOINTS } from "../utils/apiRoute";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import apiService from "../service/apiService";

function Register() {
  const { data } = useContext(DataContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(data || "");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [fullName, setFullName] = useState("");
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Mật khẩu và Nhập lại mật khẩu không khớp");
      return;
    }

    const userData = {
      role: "USER",
      fullName,
      username,
      email,
      address: [address],
      phoneNumber: phone,
      habbit: [interest],
      password,
    };

    const response = await apiService.post(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    // .catch((error) => {
    //   console.log(error.response.data);
    //   console.log(error.response.status);
    //   console.log(error.response.headers);
    // });
    console.log("hello");
    if (response.status != 201) {
      throw new Error("Có lỗi xảy ra trong quá trình đăng ký");
    }
    setMessage("Đăng ký thành công!");
    setSuccess(true); // Đánh dấu đăng ký thành công
    history.push("/login");
  };

  return (
    <div>
      <div className="login-page">
        <div className="form">
          <form className="register-form" onSubmit={handleRegister}>
            <h2>
              <i className="fas fa-lock"></i> Đăng ký
            </h2>
            {message && <p>{message}</p>}
            <input
              className="input-login"
              type="text"
              placeholder="Họ và tên *"
              required
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              className="input-login"
              type="text"
              placeholder="Tên đăng nhập *"
              required
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email *"
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Địa chỉ *"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Số điện thoại *"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Sở thích *"
              required
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu *"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu *"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="btn-otp" type="submit">
              Đăng kí
            </button>
            {success && (
              <p className="message">
                Đăng ký thành công!{" "}
                <Link to="/login">Nhấn vào đây để đăng nhập</Link>
              </p>
            )}
            {!success && (
              <p className="message">
                Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
