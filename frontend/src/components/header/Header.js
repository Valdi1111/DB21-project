import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faWineGlass} from "@fortawesome/free-solid-svg-icons"
import Logged from "./Logged";
import NotLogged from "./NotLogged";

function Header(props) {

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
                {props.logged ? <Logged logout={props.logout}/> : <NotLogged/>}
            </div>
        </header>
    );

}

export default Header;