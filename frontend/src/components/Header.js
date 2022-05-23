import {Link, useLocation, useNavigate} from "react-router-dom";
import AuthService from "../services/auth-service"
import wine from '../icons/wine-glass-solid.svg'

function Header() {
    const user = AuthService.getUser();
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout(e) {
        AuthService.logout();
        navigate("/");
    }

    let login;
    if(user) {
        login = (
            <div className="dropdown text-end">
                <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle"
                   id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32"
                         className="rounded-circle"/>
                </a>
                <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser">
                    <li><a className="dropdown-item" href="#">{user.name}</a></li>
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Sign out</a></li>
                </ul>
            </div>
        );
    } else {
        login = (
            <div className="text-end">
                <Link to="/login" replace state={{from: location}} className="btn btn-outline-primary me-2">Login</Link>
                <button type="button" className="btn btn-primary">Sign-up</button>
            </div>
        );
    }

    return (
        <header className="p-3 mb-3 border-bottom">
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
                {login}
            </div>
        </header>
    );

}

export default Header;