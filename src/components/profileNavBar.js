import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ProfileNavbar(props) {
    return (<div className="col-md-3 pt-0">
        <div className="list-group list-group-flush account-settings-links">
            <Link
                className={ props == "General" ? "list-group-item list-group-item-action active":"list-group-item list-group-item-action"}
                data-toggle="list"
                to="/profile/detail"
            >
                General
            </Link>
            <Link
                className={ props == "ChangePassword" ? "list-group-item list-group-item-action active":"list-group-item list-group-item-action"}
                data-toggle="list"
                to="/profile/change-password"
            >
                Change password
            </Link>
        </div>
    </div>)
}

export default ProfileNavbar;