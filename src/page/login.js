import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/login.css";
import { DataContext } from "../utils/dataContext";
import apiService, { setAuthToken } from "../service/apiService";
import { API_ENDPOINTS } from "../utils/apiRoute";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function Login() {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setData } = useContext(DataContext);
  const [err, setErr] = useState("");

  const handleInputValue = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      console.log("set value failed");
    }
  };

  // const handleUsernameChange = (event) =>{
  //   setUserName(event.target.value)
  // }

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      console.log(userName);
      console.log(password);
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, {
        username: userName,
        password,
      });

      setLoading(false);
      if (response.data.status >= 299) {
        alert(response.data.message);
      } else {
        const { access_token } = response.data;
        if (access_token) {
          alert("Login successfullyl");
          localStorage.setItem("token", access_token);
          history.push("/")
          // setAuthToken(token);
        }
      }

      // if (role === "ADMIN" && token) {
      //   alert("Login successfully");
      //   setAuthToken(token);
      //   setData({ token, userName, role });
      //   history.push("index.admin.html"); // Điều hướng đến trang admin
      // } else {
      //   setErr("You are not admin");
      //   alert("You are not admin");
      // }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr("Login failed");
      // alert("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="login-page">
        <div className="form">
          <form className="login-form" method="post" onSubmit={handleLogin}>
            <h2>
              <i className="fas fa-lock"></i> Đăng nhập
            </h2>
            <input
              className="input-login"
              type="text"
              placeholder="Tên đăng nhập *"
              name="username"
              value={userName}
              onChange={handleInputValue}
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu *"
              name="password"
              value={password}
              onChange={handleInputValue}
              required
            />
            {err && (
              <div className="error">
                <p>{err}</p>
              </div>
            )}
            <button className="btn-otp" type="submit" name="send2" disabled={loading}>
              {loading ? "Loading..." : "Đăng nhập"}
            </button>
            <p className="message">
              Bạn chưa có tài khoản? <Link to="/otp">Đăng ký</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
