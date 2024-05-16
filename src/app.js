import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./page/homePage";
import Login from "./page/login";
import Register from "./page/register";
import Otp from "./page/otp";
import ProfileDetailPage from "./page/profile.user";
import changePassword from "./page/changePassword";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/otp" component={Otp} />
        <Route path="/profile/detail" component={ProfileDetailPage} />
        <Route path="/profile/change-password" component={changePassword} />
      </Switch>
    </div>
  );
} // đây là nơi khai báo các route của các trang 
// exact là trang chủ lần đầu chạy

export default App;
