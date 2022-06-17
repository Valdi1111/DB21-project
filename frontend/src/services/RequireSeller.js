import {Navigate, useLocation} from "react-router-dom";
import AuthService from "./AuthService";

function RequireSeller(props) {
    let location = useLocation();

    if (AuthService.isSeller()) {
        return props.children;
    } else {
        return <Navigate to="/login" state={{from: location}} replace/>
    }
}

export default RequireSeller;