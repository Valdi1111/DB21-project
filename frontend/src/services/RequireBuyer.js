import {Navigate, useLocation} from "react-router-dom";
import AuthService from "./AuthService";

function RequireBuyer(props) {
    let location = useLocation();

    if (AuthService.isBuyer()) {
        return props.children;
    } else {
        return <Navigate to="/login" state={{from: location}} replace/>
    }
}

export default RequireBuyer;