
import React, { useEffect, useState } from "react";
import apiService from "../service/apiService";
import { API_ENDPOINTS } from "../utils/apiRoute";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../components/header";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function checkout() {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setUserAddress] = useState("");
    const [payMethod, setPayMethod] = useState("");

    useEffect(() => {

        const getUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await apiService.get(API_ENDPOINTS.USER.GET_CURRENT_USER);
                setUser(response.data);
                console.log(response.data);
                setUserAddress(response.data.address[0]);
                return response.data;
            }

        };

        const renderCartData = async () => {
            const user = await getUserData();
            const response = await apiService.get(`${API_ENDPOINTS.CART.BASE}?userId=${user._id}&populate=products.productId`);
            const result = response.data[0].products;
            setCart(result);
            var total = 0;
            await result.map((items) => total += items.quantity * items.productId.price);
            setTotal(total);
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

    const createCheckout = async (event) => {
        event.preventDefault();
        const response = await apiService.get(`${API_ENDPOINTS.CART.BASE}?userId=${user._id}`);
        const result = response.data[0].products;
        const data = {
            userId: user._id,
            address,
            products: result,
            status: "WAITING",
            payMethod: payMethod,
            totalPrice: total
        }
        await apiService.post(API_ENDPOINTS.BILL.BASE, data).then((response) => {
            alert("Đặt mua thành công");
            history.push("/");
        }).catch((error) => {
            console.log(error.response);
            alert("error");
        });
    }
    return (
        <div>
            <Header fullName={user.fullName} />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            <span className="badge badge-secondary badge-pill">{cart.length}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {cart.map((items) => (
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">{items.productId.name}</h6>
                                        <small className="text-muted">x{items.quantity}</small>
                                    </div>
                                    <span className="text-muted">{items.productId.price * items.quantity}.000 VND</span>
                                </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (VND)</span>
                                <strong>{total}.000 VND</strong>
                            </li>
                        </ul>


                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" novalidate onSubmit={createCheckout} >
                            
                            <div className="row">

                                <div className="col-md-12 mb-3">
                                    <label for="lastName">Full name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="" value={user.fullName} readOnly />
                                    <div className="invalid-feedback">
                                        Valid last name is required.
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="email">Email </label>
                                <input type="email" className="form-control" id="email" value={user.email} readOnly />
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="address">Address</label>
                                <input type="text" className="form-control" id="address" value={address} />
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>
                            <hr className="mb-4" />

                            <h4 className="mb-3">Payment</h4>

                            <div className="d-block my-3">
                                <div className="custom-control custom-radio">
                                    <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" value={"DIRECT"} onChange={(e) => { setPayMethod(e.target.value) }}
                                        required />
                                    <label className="custom-control-label" for="credit">Online</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" value={"ONLINE"} onChange={(e) => { setPayMethod(e.target.value) }}
                                        required />
                                    <label className="custom-control-label" for="debit">Direct</label>
                                </div>
                            </div>


                            <hr className="mb-4" />
                            <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>

                        </form>
                    </div>
                </div>

                <footer className="my-5 pt-5 text-muted text-center text-small">
                    {/* <p className="mb-1">&copy; 2017-2020 Company Name</p> */}
                    <ul className="list-inline">
                        <li className="list-inline-item"><a href="#">Privacy</a></li>
                        <li className="list-inline-item"><a href="#">Terms</a></li>
                        <li className="list-inline-item"><a href="#">Support</a></li>
                    </ul>
                </footer>
            </div>
        </div>
    )
}
export default checkout;