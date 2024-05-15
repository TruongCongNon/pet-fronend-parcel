import "../styles/layout/header.css"; 
import logoShop from "../assets/images/logo_cho_meo_web.png"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import React from "react";

function Header({fullName}) {
  return (
    <div>
      <header>
        <div class="head">
          <div class="head-title">
            <div class="head-logo">
              <img src={logoShop} alt="" />
            </div>
            <div class="head-search">
              <input type="text" placeholder="Find the best for your pet..." />
              <button class="btn-search">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div class="head-right">
              <span>Here to help!</span>
              <span>
                <a href=""> 0353407454</a> | <a href="">Liên hệ</a>
              </span>
            </div>
          </div>
          <div class="head-menu-nav">
            <ul class="nav-content">
              <li>
                <a href="">Sale</a>
              </li>
              <li>
                <a href="">Brand</a>
              </li>
              <li>
                <a href="">Chó </a>
              </li>
              <li>
                <a href="">Mèo</a>
              </li>
            </ul>
          </div>
          <div class="profile_account-cart">
            <div class="profile_account">    
            {fullName ? (
                <>
                  <Link>{fullName}</Link>
                  <Link to="/profile">Tài khoản của bạn </Link>
                </>
              ) : (
                <Link to="./login">Đăng nhập</Link>
              )}
            </div>
            <div class="cart">
              <a href="./gio-hang.html">
                <i class="fa-solid fa-cart-shopping"></i>
              </a>
              <p>0</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header