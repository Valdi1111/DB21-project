import {Navigate, useLocation} from "react-router-dom";
import ErrorPage from "../components/ErrorPage";

function RequireAuth(props) {
    //let location = useLocation();

    if (props.auth) {
        return props.children;
    } else {
        //return <Navigate to="/login" state={{from: location}} replace/>
        return <ErrorPage title="Access denied" name="Home" link="/"/>;
    }
}

export default RequireAuth;
