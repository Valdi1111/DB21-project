import {Link, useLocation} from "react-router-dom";

function NotLogged() {
    const location = useLocation();

    return (
        <div className="text-end">
            <Link to="/login" replace state={{from: location}} className="btn btn-outline-primary me-2">Login</Link>
            <button type="button" className="btn btn-primary">Sign-up</button>
        </div>
    );

}

export default NotLogged;