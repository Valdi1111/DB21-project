import {useLocation} from "react-router";
import {Navigate, Route} from "react-router-dom";

function RequireAuth(props) {
    let location = useLocation();

    if (props.auth.isLoggedIn()) {
        return props.children;
    } else {
        return <Navigate to="/login" state={{from: location}} replace/>
    }
}

export default RequireAuth;