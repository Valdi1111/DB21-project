import {Link, useLocation, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faShoppingCart, faWineGlass} from "@fortawesome/free-solid-svg-icons"
import Notifications from "./Notifications";
import {avatars_url} from "../../services/ApiUrls";

function Header(props) {
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout(e) {
        props.logout();
        navigate("/");
    }

    function logged() {
        let buttons = <></>;
        if (props.auth.user.type === "buyer") {
            buttons = (
                <Link to="/cart" className="p-1 me-2" style={{width: 32, height: 32}}>
                    <FontAwesomeIcon icon={faShoppingCart} className="text-secondary w-100 h-100"/>
                </Link>
            );
        }
        return (
            <div className="d-flex flex-wrap align-items-center justify-content-center ">
                <Notifications auth={props.auth}/>
                {buttons}
                <div className="dropdown text-end ps-1">
                <span className="d-block link-secondary text-decoration-none dropdown-toggle"
                      style={{cursor: "pointer"}} id="dropdown-user" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={avatars_url + props.auth.user.avatar} alt="mdo" width="32" height="32"
                         className="rounded-circle"/>
                    <span className="px-1">{props.auth.user.username}</span>
                </span>
                    <ul className="dropdown-menu text-small" aria-labelledby="dropdown-user">
                        {props.auth.user.type === "buyer" ?
                            <li><Link to="/orders" className="dropdown-item">Orders</Link></li> :
                            <></>
                        }
                        {props.auth.user.type === "seller" ?
                            <li><Link to="/my-products" className="dropdown-item">Products</Link></li> :
                            <></>
                        }
                        {props.auth.user.type === "buyer" || props.auth.user.type === "seller" ?
                            <>
                                <li><Link to="/chat" className="dropdown-item">Chat</Link></li>
                                <li><Link to="/settings/profile" className="dropdown-item">Settings</Link></li>
                            </> :
                            <></>
                        }
                        {props.auth.user.type === "administrator" ?
                            <li><Link to="/dashboard" className="dropdown-item">Dashboard</Link></li> :
                            <></>
                        }
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
                <Link to="/register" state={{from: location}} replace className="btn btn-primary">Register</Link>
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
                {props.auth ? logged() : notLogged()}
            </div>
        </header>
    );

}

export default Header;
