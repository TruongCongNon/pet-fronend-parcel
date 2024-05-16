import React, { useEffect, useState } from "react";
import "../styles/pages/profile.user.css";
import Header from "../components/header";
import apiService from "../service/apiService";
import { API_ENDPOINTS } from "../utils/apiRoute";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ProfileDetailPage() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [habbit, setHabbit] = useState([]);
  const [dogChecked, setDogChecked] = useState("false");
  const [catChecked, setCatChecked] = useState("false");

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await apiService.get(
          API_ENDPOINTS.USER.GET_CURRENT_USER
        );
        await setUser(response.data);
        await setEmail(response.data.email);
        await setPhoneNumber(response.data.phoneNumber);
        await setHabbit(response.data.habbit);
      }
    };
    getUserData();
  }, []);

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await apiService.get(
        API_ENDPOINTS.USER.GET_CURRENT_USER
      );
      await setUser(response.data);
      await setEmail(response.data.email);
      await setPhoneNumber(response.data.phoneNumber);
      await setHabbit(response.data.habbit);
    }
  };
  const updateUser = async (event) => {
    event.preventDefault();
    const data = {
      phoneNumber,
      email,
    };
    const response = await apiService.put(
      `${API_ENDPOINTS.USER.BASE}/${user._id}`,
      data
    );
    console.log(response);
    if (response.status <= 299 && response.status >= 200) {
      await getUserData();
      alert("Update Successfull!!!");
    } else {
      alert("Update error");
    }
  };

  return (
    <div>
      <Header fullName={user.fullName} />
      <div className="container light-style flex-grow-1 container-p-y">
        <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>

        <div className="row no-gutters row-bordered row-border-light">
          <div className="col-md-3 pt-0">
            <div className="list-group list-group-flush account-settings-links">
              <a
                className="list-group-item list-group-item-action active"
                data-toggle="list"
                href="#account-general"
              >
                General
              </a>
              {/* <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-change-password"
              >
                Change password
              </a> */}
              <Link className="list-group-item list-group-item-action" to="/profile/change-password">Change password</Link>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-info"
              >
                Info
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-social-links"
              >
                Social links
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-connections"
              >
                Connections
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-notifications"
              >
                Notifications
              </a>
            </div>
          </div>
          <div className="col-md-9">
            <form className="p-5" onSubmit={updateUser}>
              <div class="form-row">
                <div class="form-group col-md-11">
                  <label for="inputEmail4">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    value={email}
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputAddress">phoneNumber</label>
                <input
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                />
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onChange={(e) => {
                    setDogChecked(e.target.value);
                  }}
                  checked={dogChecked}
                />
                <label class="form-check-label" for="flexCheckDefault">
                  DOG
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  onChange={(e) => {
                    setCatChecked(e.target.value);
                  }}
                  checked={catChecked}
                />
                <label class="form-check-label" for="flexCheckChecked">
                  CAT
                </label>
              </div>
              <div class="form-row mb-3">
                {/* <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input c type="text" class="form-control" id="inputZip"/>
    </div> */}
              </div>

              <button type="submit" class="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileDetailPage;
