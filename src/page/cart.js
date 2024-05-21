import React, { useEffect, useState } from "react";
import apiService from "../service/apiService";
import { API_ENDPOINTS } from "../utils/apiRoute";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../components/header";
import "../styles/pages/cart.css";

function ProductCart() {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);

    useEffect(() => {

        const getUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await apiService.get(API_ENDPOINTS.USER.GET_CURRENT_USER);
                setUser(response.data);
                return response.data;
            }

        };

        const renderCartData = async () => {
            const user = await getUserData();
            const response = await apiService.get(`${API_ENDPOINTS.CART.BASE}?userId=${user._id}&populate=products.productId`);
            const result = response.data[0].products;
            setCart(result);
        }

        getUserData();
        renderCartData();

        const unlisten = history.listen(() => {
            getUserData();
            renderCartData();
        });

        return () => {
            unlisten();
        };

    }, [history]);

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
                                {cart.map((items) => (<tr>
                                    <td className="img-cart"><input type="checkbox" className="checkbox-item" /></td>
                                    <td className="img-cart"><img src={items.productId.images[0]} /></td>
                                    <td>{items.productId.name}</td>
                                    <td className="cart-content">{items.productId.price}.000 VND</td>
                                    <td className="cart-content">
                                        <div className="content-left-quanlity-product ">
                                            <button id="plus-btn" ><i className="fa-solid fa-plus"></i></button>
                                            <input id="amount" className="input-cart" type="text" value={items.quantity} readOnly />
                                            <button id="minus-btn" ><i className="fa-solid fa-minus"></i></button>
                                        </div>
                                    </td>
                                    <td className="cart-content">{items.productId.price * items.quantity}.000 VND</td>
                                    <td className="cart-content"><button>Xóa</button></td>
                                </tr>))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div style={{display:"flex", justifyContent: "center"}}>
                <button type="button" class="btn btn-primary">Thanh toán</button>
            </div>
        </div>
    );
}

export default ProductCart;
