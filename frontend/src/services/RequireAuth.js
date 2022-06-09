import {Navigate, useLocation} from "react-router-dom";
import AuthService from "./AuthService";

function RequireAuth(props) {
    let location = useLocation();

    if (AuthService.isLoggedIn()) {
        return props.children;
    } else {
        return <Navigate to="/login" state={{from: location}} replace/>
    }
}

export default RequireAuth;