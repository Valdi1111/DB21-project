import {Link, useLocation, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faShoppingCart, faWineGlass} from "@fortawesome/free-solid-svg-icons"
import Notifications from "./Notifications";
import {avatars_url} from "../../services/ApiUrls";
import AuthService from "../../services/AuthService";

function Header(props) {
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout(e) {
        props.logout();
        navigate("/");
    }

    function logged() {
        let buttons = <></>;
        if (AuthService.isBuyer()) {
            buttons = (
                <Link to="/cart" className="p-1 me-2" style={{width: 32, height: 32}}>
                    <FontAwesomeIcon icon={faShoppingCart} className="text-secondary w-100 h-100"/>
                </Link>
            );
        }
        return (
            <div className="d-flex flex-wrap align-items-center justify-content-center ">
                <Notifications/>
                {buttons}
                <div className="dropdown text-end ps-1">
                <span className="d-block link-secondary text-decoration-none dropdown-toggle"
                      style={{cursor: "pointer"}} id="dropdown-user" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={avatars_url + AuthService.user.avatar} alt="mdo" width="32" height="32"
                         className="rounded-circle"/>
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

    function notLogged() {
        return (
            <div className="text-end">
                <Link to="/login" state={{from: location}} replace className="btn btn-outline-primary me-2">Login</Link>
                <button type="button" className="btn btn-primary">Sign-up</button>
            </div>
        );
    }

    return (
        <header className="p-3 border-bottom">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="#" className="d-flex align-items-center text-dark text-decoration-none">
                    <FontAwesomeIcon icon={faWineGlass} style={{width: "40", height: 32}}/>
                </a>
                <ul className="ms-lg-3 nav col-12 col-lg-auto me-lg-auto justify-content-center">
                    <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
                    <li><Link to="/shop" className="nav-link px-2 link-dark">Shop</Link></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Customers</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Products</a></li>
                </ul>
                {props.logged ? logged() : notLogged()}
            </div>
        </header>
    );

}

export default Header;
