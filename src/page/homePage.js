import React, { useEffect, useState } from "react";
import "../styles/layout/footer.css";
// khai báo css
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Slide1Img from "../assets/images/slides1.jpg"; // khai báo tài nguyên như ảnh, âm thanh ,....
import Slide2Img from "../assets/images/slides2.jpg";
import Slide3Img from "../assets/images/slides3.jpg";
import "../styles/pages/main.css";
import Header from "../components/header";
import apiService from "../service/apiService";
import "../styles/layout/index.css";
import { API_ENDPOINTS } from "../utils/apiRoute";

function HomePage() {
  const history = useHistory();
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
        const products = response.data;
        let SplitProducts = [];
        for (let i = 0; i < products.length; i += 3) {
          SplitProducts.push(products.slice(i, i + 3));
        }
        console.log(SplitProducts);
        setProducts(SplitProducts);
      }
    };

    const unlisten = history.listen(() => {
      getUserData();
      getProductData();
    });
    getUserData();
    getProductData();
    return () => {
      unlisten();
    };
  }, [history]);

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
            <span class="visually-hidden"></span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden"></span>
          </button>
        </div>

        <div class="main">

          <section class="pt-5 pb-5">
            <div class="container">
              <div class="row">
                <div class="col-6">
                  <h3 class="mb-3"><b>Top Products</b></h3>
                </div>
                <div class="col-6 text-right">
                  <a class="btn btn-primary mb-3 mr-1"
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-slide="prev">
                    <i class="fa fa-arrow-left"></i>
                  </a>
                  <a class="btn btn-primary mb-3"
                    href="#carouselExampleIndicators2"
                    role="button"
                    data-slide="next">
                    <i class="fa fa-arrow-right"></i>
                  </a>
                </div>
                <div class="col-12">
                  <div id="carouselExampleIndicators2"
                    class="carousel slide"
                    data-ride="carousel">
                    <div class="carousel-inner">
                      {/* data loading products */}
                      {products.map((product, index) => (

                        <div className={index == 0 ? "carousel-item active" : "carousel-item"} >
                          <div className="row">
                            {
                              product.map((items) => (
                                <div className="col-md-4 mb-3">
                                  <Link to={`/product-detail?id=${items._id}`} style={{ color: "black" }}>
                                    <div class="card">
                                      <img class="img-fluid"
                                        alt="100%x280"
                                        src={items.images[0]}
                                      />
                                      <div class="card-body">
                                        <h4 class="card-title" style={{ fontWeight: "bold" }}>{items.name}</h4>
                                        <p class="card-text">Giá: {items.price}.000VND</p>
                                        <p class="card-text mt-2">Giới tính: {items.gender == "FEMALE" ? "Con cái" : "Con đực"}</p>
                                      </div>
                                    </div>
                                  </Link>

                                </div>
                              ))

                            }
                          </div>
                        </div>

                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


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
