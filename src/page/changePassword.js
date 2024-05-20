import { useEffect, useState } from "react";
import Header from "../components/header";
import apiService from "../service/apiService";
import { API_ENDPOINTS } from "../utils/apiRoute";
import ProfileNavbar from "../components/profileNavBar";

function changePassword() {
    const [user, setUser] = useState({});
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");


    useEffect(async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const response = await apiService.get(
                API_ENDPOINTS.USER.GET_CURRENT_USER
            );
            await setUser(response.data);
        }

    }, []);

    const updatePassword = async (event) => {
        event.preventDefault();
        const data = {
            email: user.email,
            password: newPassword,
            oldPassword: oldPassword
        }
        await hashSync(user.password, 10);

        if (newPassword != repeatPassword) { alert("please repeat new password!"); } else {
            await apiService.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data).then((data) => {
                alert("change password successful");
            }).catch((e) => {
                alert("Change password fail");
                setNewPassword("");
                setOldPassword("");
                setRepeatPassword("");
            })
        }


    }

    return (<div>
        <Header fullName={user.fullName} />
        <div className="container light-style flex-grow-1 container-p-y">
            <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>

            <div className="row no-gutters row-bordered row-border-light">
                <ProfileNavbar props="ChangePassword"/>
                <div className="col-md-9">
                    <form className="p-5" onSubmit={updatePassword}>
                        <div class="form-row">
                            <div class="form-group col-md-11">
                                <label for="inputEmail4">Old Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="inputEmail4"
                                    // value={oldPassword}
                                    onChange={(e) => { setOldPassword(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputAddress">New Password</label>
                            <input

                                type="password"
                                class="form-control"
                                id="inputAddress"
                                // value={newPassword}
                                onChange={(e) => { setNewPassword(e.target.value) }}
                            />
                        </div>
                        <div class="form-group">
                            <label for="inputAddress">Repeat new password</label>
                            <input

                                type="password"
                                class="form-control"
                                id="inputAddress"
                                // value={}
                                onChange={(e) => { setRepeatPassword(e.target.value) }}
                            />
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
                            Update password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default changePassword;