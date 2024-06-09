import React, { useEffect, useState } from "react";
import "../styles/pages/profile.user.css";
import Header from "../components/header";
import apiService from "../service/apiService";
import { API_ENDPOINTS } from "../utils/apiRoute";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ProfileNavbar from "../components/profileNavBar";

function ProfileDetailPage() {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [habbit, setHabbit] = useState([]);
  const [dogChecked, setDogChecked] = useState("false");
  const [catChecked, setCatChecked] = useState("false");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };


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
        await setPreviewUrl(response.data.avatar);
      }
    };
    const unlisten = history.listen(() => {
      getUserData();
    });

    getUserData(); // Chạy ngay lần đầu tiên component được mount

    return () => {
      unlisten(); // Hủy lắng nghe khi component bị unmount
    };
  }, [history]);

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await apiService.get(
        API_ENDPOINTS.USER.GET_CURRENT_USER
      );
      await setUser(response.data);

      // await setUserName(response.data.userName);
      // await setFullName(response.data.fullName);

      await setEmail(response.data.email);
      await setPhoneNumber(response.data.phoneNumber);
      await setHabbit(response.data.habbit);
    }
  };
  const updateUser = async (event) => {
    event.preventDefault();
    const data = {
      // userName,
      // fullName,
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

  const handleUploadProfileImg = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    const response = await apiService.post(API_ENDPOINTS.UPLOAD.AVATAR, formData).then((data) => { alert("Upload Complete!"); }).catch((error) => { alert("Upload Faild"); console.log(error); })
  }

  return (
    <div>
      <Header fullName={user.fullName} />
      <div className="container light-style flex-grow-1 container-p-y">
        <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>

        <div className="row no-gutters row-bordered row-border-light">

          <ProfileNavbar props="General" />
          <div className="col-md-9">
            <form className="p-5" onSubmit={updateUser}>
              <div class="input-group change-avt mb-3">
                <img class="img-thumbnail rounded-circle image-uploader" style={{ maxWidth: "25%" }} src={previewUrl ? previewUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
                <div className="link-avt">
                <input type="file" class="form-control link-avt-input" id="inputGroupFile02" onChange={onFileChange} />
                <label class="input-group-text label-btn " for="inputGroupFile02" onClick={handleUploadProfileImg}>Upload</label>
                </div>
              </div>
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
                <label for="inputAddress">PhoneNumber</label>
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
