import React, { useEffect, useState } from "react";
import apiService from "../service/apiService";
import { API_ENDPOINTS } from "../utils/apiRoute";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../components/header";
import "../styles/pages/cart.css";

function ProductCart() {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [images, setImage] = useState(0);
    const query = useLocation();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
     // Initialize quantity with 1

    useEffect(() => {
        const searchParams = new URLSearchParams(query.search);
        const id = searchParams.get("id");

        const getUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await apiService.get(API_ENDPOINTS.USER.GET_CURRENT_USER);
                setUser(response.data);
            }
        };

        const getDetailProduct = async (id) => {
            try {
                const response = await apiService.get(`${API_ENDPOINTS.PRODUCT.BASE}/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.log("Failed to fetch product:", error);
            }
        };

        getUserData();
        getDetailProduct(id); // Fetch product details based on the id

        const unlisten = history.listen(() => {
            getUserData();
            getDetailProduct(id); // Fetch updated product details when navigating within the app
        });

        return () => {
            unlisten();
        };

    }, [history, query.search]);

    const handlePlus = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const totalPrice = parseInt(product.price) * quantity; // Convert to integer

    return (
        <div>
            <Header fullName={user.fullName} />
            <div className="cart-product">
                <div className="cart-title">
                    <p>Giỏ hàng</p>
                </div>
                <div className="cart-category">
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" id="selectAll" /></th>
                                    <th>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Số tiền</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="img-cart"><input type="checkbox" className="checkbox-item" /></td>
                                    <td className="img-cart"><img src={product.img}/></td>
                                    <td>{product.name}</td>
                                    <td className="cart-content">{product.price} VND</td>
                                    <td className="cart-content">
                                        <div className="content-left-quanlity-product ">
                                            <button id="plus-btn" onClick={handlePlus}><i className="fa-solid fa-plus"></i></button>
                                            <input id="amount" className="input-cart" type="text" value={quantity} readOnly />
                                            <button id="minus-btn" onClick={handleMinus}><i className="fa-solid fa-minus"></i></button>
                                        </div>
                                    </td>
                                    <td className="cart-content">{totalPrice} VND</td>
                                    <td className="cart-content"><button>Xóa</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCart;
