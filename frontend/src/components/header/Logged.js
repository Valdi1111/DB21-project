import {Link, useNavigate} from "react-router-dom";
import Notifications from "./Notifications";
import LoggedBuyer from "./LoggedBuyer";
import LoggedSeller from "./LoggedSeller";
import AuthService from "../../services/AuthService";
import {avatars_url} from "../../services/ApiUrls";

function Logged(props) {
    const navigate = useNavigate();

    function handleLogout(e) {
        props.logout();
        navigate("/");
    }

    return (
        <div className="d-flex flex-wrap align-items-center justify-content-center ">
            <Notifications/>
            {AuthService.isBuyer() ? <LoggedBuyer/> : <></>}
            {AuthService.isSeller() ? <LoggedSeller/> : <></>}
            <div className="dropdown text-end ps-1">
                <span className="d-block link-secondary text-decoration-none dropdown-toggle"
                      style={{cursor: "pointer"}} id="dropdown-user" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={avatars_url + AuthService.user.avatar} alt="mdo" width="32" height="32" className="rounded-circle"/>
                    <span className="px-1">{AuthService.user.username}</span>
                </span>
                <ul className="dropdown-menu text-small" aria-labelledby="dropdown-user">
                    <li><Link to="/settings/profile" className="dropdown-item">Settings</Link></li>
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li><span className="dropdown-item" style={{cursor: "pointer"}}
                              onClick={handleLogout}>Sign out</span></li>
                </ul>
            </div>
        </div>
    );

}

export default Logged;