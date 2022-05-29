import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

function LoggedBuyer() {

    return (
        <Link to="/cart" className="p-1 me-2" style={{width: 32, height: 32}}>
            <FontAwesomeIcon icon={faShoppingCart} className="text-secondary w-100 h-100" />
        </Link>
    );

}

export default LoggedBuyer;