import React, { useState, useEffect } from "react";
import "../styles/layout/footer.css";
// khai báo css
import "../styles/layout/index.css";
import logoShop from "../assets/images/logo_cho_meo_web.png";
import Slide1Img from "../assets/images/slides1.jpg"; // khai báo tài nguyên như ảnh, âm thanh ,....
import Slide2Img from "../assets/images/slides2.jpg";
import Slide3Img from "../assets/images/slides3.jpg";
import pictureCard from "../assets/images/cart1.png";
import { Link } from "react-router-dom"; // chuyển trang bằng tag <a href=""/> nhưng ở đây trang sẽ ko bị loading mà sẽ chuyển tthanwgr
import Header from "../components/header";
import apiService from "../service/apiService";
import { API_ENDPOINTS } from "../utils/apiRoute";

function HomePage() {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await apiService.get(
          API_ENDPOINTS.USER.GET_CURRENT_USER
        );
        setUser(response.data);
      }
    };
    const getProductData = async () => {
      const response = await apiService.get(API_ENDPOINTS.PRODUCT.BASE);
      if (response.status >= 200 && response.status <= 299) {
        setProducts(response.data);
      }
    };

    getUserData();
    getProductData();
  });

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await apiService.get(
        API_ENDPOINTS.USER.GET_CURRENT_USER
      );
      if (response.status != 401) {
        setUser(response.data);
      } else {
        console.log("token is null. Please login");
      }
    }
  };
  return (
    <div>
      <Header fullName={user.fullName} />
      <main>
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={Slide1Img} class="d-block w-100 h-60 " alt="..." />
            </div>
            <div class="carousel-item">
              <img src={Slide2Img} class="d-block w-100 h-60" alt="..." />
            </div>
            <div class="carousel-item">
              <img src={Slide3Img} class="d-block w-100 h-60" alt="..." />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <div class="main">
          <div class="main-left">
            <div class="main-left-title">
              <p>Lọc giá tiền</p>
            </div>
            <div class="filter-container">{/* filter condition */}</div>
          </div>
          <div class="main-right">
            <div class="main-right-title">
              <p>Product</p>
            </div>

            <div class="main-rigth-content">
              {products.map((product) => (
                <div class="card">
                  <div class="card-view">
                    <img class="card-img" src={product.images[0]} alt="" />
                    <p class="card-price">{product.price}.000VND</p>
                  </div>
                  <div class="card-body">
                    <h1 class="card-title">Mèo hoàng gia</h1>
                    <p class="card-sub-title">Xuất xứ:{product.origin}</p>
                    <p class="card-sub-title">Tuổi:{product.age}</p>
                    <p class="card-sub-title mt-1">Giới tính:{product.gender == "MALE" ? "Giống đực" : "Giống cái"}</p>

                    <div class="btn-cart-sale">
                      <a href="./chi-tiet-san-pham.html">
                        <button class="card-btn">Mua ngay</button>
                      </a>
                      <a href="">
                        <i class="fa-solid fa-cart-shopping"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          .
        </div>
      </main>
      <footer>
        <div class="footer">
          <div class="footer-top"></div>
          <div class="footer-bottom">@Nhóm 6</div>
        </div>
      </footer>
      <script src=""></script>
    </div>
  );
}

export default HomePage;
