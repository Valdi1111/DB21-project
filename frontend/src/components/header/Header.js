import {Link} from "react-router-dom";
import wine from '../../icons/wine-glass-solid.svg'
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import AuthService from "../../services/AuthService";
import {useEffect, useState} from "react";
import axios from "axios";
import {api_user_url} from "../../services/ApiUrls";

function Header() {
    AuthService.updateToken();
    const [auth, setAuth] = useState(<></>);
    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            fetchData();
        } else {
            logout();
        }
    }, []);

    function fetchData() {
        axios
            .get(
                `${api_user_url}data`,
                {headers: AuthService.authHeader()}
            )
            .then(
                res => {
                    AuthService.user = res.data;
                    login();
                },
                err => {
                    AuthService.logout();
                    logout();
                }
            )
    }

    function login() {
        setAuth(<Logged logout={logout}/>);
    }

    function logout() {
        setAuth(<NotLogged/>);
    }

    return (
        <header className="p-3 border-bottom">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="#" className="d-flex align-items-center text-dark text-decoration-none">
                    <img src={wine} alt="Logo" width="40" height="32"/>
                </a>
                <ul className="ms-lg-3 nav col-12 col-lg-auto me-lg-auto justify-content-center">
                    <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
                    <li><Link to="/shop" className="nav-link px-2 link-dark">Shop</Link></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Customers</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Products</a></li>
                </ul>
                {/*AuthService.isLoggedIn() && AuthService.user ? <Logged logout={logout}/> : <NotLogged/>*/}
                {auth}
            </div>
        </header>
    );

}

export default Header;