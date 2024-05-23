import React, { useEffect, useState } from "react";
import apiService from "../service/apiService";
import { API_ENDPOINTS } from "../utils/apiRoute";
import { Link, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../components/header";
import "../styles/pages/ProductDetail.css";
function ProductDetail() {
    const history = useHistory();
    const [user, setUser] = useState({});
    const query = useLocation();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [productCategory, setProductCategory] = useState({});
    const [feedbackDecription, setFeedbackDescription] = useState("");
    const [feedback, setFeedback] = useState([]);
    const searchParams = new URLSearchParams(query.search);
    const id = searchParams.get("id");


    const addToCart = async () => {
        const data = {
            productId: id,
            quantity: quantity
        };
        await apiService.post(API_ENDPOINTS.CART.ADD_TO_CART, data).then((response) => {
            alert("Thêm vào giỏ hàng thành công");
        }).catch((error) => {
            alert("Failed");
            console.log(error);
        });
    }

    const sendFeedBack = async (event) => {
        event.preventDefault();
        const data = {
            userId: user._id,
            productId: id,
            description: feedbackDecription
        };
        await apiService.post(API_ENDPOINTS.FEEDBACK.BASE, data).then((response) => {
            // alert("Send feedback thành công");
        }).catch((error) => {
            alert("Gửi feedback failed");
        });
        await apiService.get(`${API_ENDPOINTS.FEEDBACK.BASE}?productId=${id}&populate=userId`).then((response) => {
            console.log(response.data);
            setFeedback(response.data);
        }).catch((error) => {
            console.error(error);
        })
        setFeedbackDescription("");
    }

    useEffect(() => {

        console.log(id);
        const getUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await apiService.get(
                    API_ENDPOINTS.USER.GET_CURRENT_USER
                );
                setUser(response.data);
            }
        };

        const getFeedback = async () => {
            await apiService.get(`${API_ENDPOINTS.FEEDBACK.BASE}?productId=${id}&populate=userId`).then((response) => {
                setFeedback(response.data);
            }).catch((error) => {
                console.error(error);
            })
        }

        const getDetailProduct = async (id) => {
            const response = await apiService.get(`${API_ENDPOINTS.PRODUCT.BASE}/${id}`).then((data) => { setProduct(data.data); }).catch((error) => { alert("Failed"); console.log(error); })
        }
        const getCategory = async () => {
            const response = await apiService.get(`${API_ENDPOINTS.CATEGORY.BASE}/${product.categoryId}`)
            if (response.status >= 200 && response.status <= 299) {
                console.log(`category data: `, response.data);
                setProductCategory(response.data)
            }

        }
        getCategory();
        getFeedback();

        const unlisten = history.listen(() => {
            getUserData();
            getDetailProduct(id);
            getCategory();
            getFeedback();
        });



        getUserData();
        getDetailProduct(id);

        return () => {
            unlisten();
        };

    }, [history, query.search, product.categoryId]);

    return (
        <div>
            <Header fullName={user.fullName} />
            <div class="details">
                <div class="product-details">
                    <div class="details-title">
                        <Link to="/">Home</Link>
                        <i class="fa-solid fa-chevron-right"></i>
                        <p>{product.name} </p>
                    </div>
                    <div class="details-content">
                        <div class="details-content-right">
                            <img src={product.images} />

                        </div>
                        <div class="details-content-left">
                            <div class="content-left-title">
                                <p>{product.name}  </p>
                            </div>
                            <div class="content-left-content">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <p>  |  212 Đánh giá |  1,1k Đã bán </p>
                            </div>
                            <div class="content-left-price">

                                <div class="price-now">
                                    <p> {product.price}.000VND </p>
                                    {/* <div class="price-voucher">
                                        <p>20% Giảm</p>
                                    </div> */}
                                </div>
                            </div>
                            <div class="content-left-ship">
                                <p>Vận chuyển </p>
                                <div class="content-left-ship-pree">
                                    <i class="fa-solid fa-truck-fast"></i>
                                    <span>Miễn phí vận chuyển </span>
                                </div>
                            </div>
                            <div class="content-left-quality">
                                <p>Số lượng</p>
                                <div class="content-left-quanlity-product">
                                    <button id="plus-btn" onclick={() => { setQuantity(quantity + 1); }}><i class="fa-solid fa-plus" ></i></button>
                                    <input id="amount" type="text" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                                    <button id="minus-btn" onClick={() => {
                                        if (quantity == 0) { alert("Quantity không thể thấp hơn 0") } else {
                                            setQuantity(quantity - 1);
                                        }
                                    }}><i class="fa-solid fa-minus" ></i></button>
                                </div>

                            </div>
                            <div class="content-left-handle-product">
                                <div class="content-left-handle-product-add">
                                    <button onClick={addToCart}>
                                        <i class="fa-solid fa-cart-shopping"></i>
                                        <p>Thêm vào giỏ hàng</p>
                                    </button>
                                </div>
                                <div class="content-left-handle-product-sale">
                                    <a href="">
                                        <p>Mua ngay</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="details-content-bottom">
                        <p>Chi tiết sản phẩm</p>
                        <div class="details-content-bottom-product">
                            <div class="content"><label for="">Danh mục</label>
                                <div class="details-content-bottom-category">
                                    <a href="">Shop pet</a>
                                    <i class="fa-solid fa-chevron-right"></i>
                                    <Link to="">{productCategory.type == "DOG" ? "Chó" : "Mèo"}</Link>
                                    <i class="fa-solid fa-chevron-right"></i>
                                    <a href="">{product.name}</a>
                                </div>
                            </div>
                            <div class="content"><label for="">Trạng thái</label><span>{product.status == "AVAILABLE" ? "Còn hàng" : "Hết hàng"}</span></div>
                            <div class="content"><label for="">Xuất xứ</label><span>{product.origin}</span></div>
                            <div class="content"><label for="">Tuổi: </label> <span>{product.age}</span></div>
                            <div class="content"><label for="">Màu: </label> <span>{product.color}</span></div>

                            <div class="content"><label for="">Mô tả </label>
                                <div class="details-pet">{product.description}</div>
                            </div>
                        </div>
                    </div>
                    <div class="details-content-bottom">
                        <p>Các đánh giá ({feedback.length}):</p>
                        {
                            feedback.length == 0 ? (<p className="pt-3 pb-3">không có đánh giá nào</p>) : feedback.map((items) => (
                                <div class="pb-3 pt-3"><div class="card" style={{ width: "95%" }}>
                                    <div class="card-header">

                                    </div>
                                    <div class="card-body">
                                        <blockquote class="blockquote mb-0">
                                            <p>{items.description}</p>
                                            <footer class="blockquote-footer">{items.userId.fullName}</footer>
                                        </blockquote>
                                    </div>
                                </div>
                                </div>
                            ))
                        }




                    </div>
                    <div class="details-content-bottom pb-5">
                        <p>Đánh giá sản phẩm:</p>

                        <div class="details-content-bottom-product mt-1">
                            <form class="row g-3" onSubmit={sendFeedBack}>

                                <div class="col-md-10">
                                    <label for="validationDefault02" class="form-label">Mô tả:</label>
                                    <input type="text" class="form-control" id="validationDefault02" value={feedbackDecription}  onChange={(e) => { setFeedbackDescription(e.target.value) }} required />
                                </div>
                                <div class="col-12 mt-3">
                                    <button class="btn btn-primary" type="submit"> Gửi đánh giá</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;