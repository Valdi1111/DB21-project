import {Navigate, useLocation} from "react-router-dom";
import ErrorPage from "../components/ErrorPage";

function RequireBuyer(props) {
    //let location = useLocation();

    if (props.auth && props.auth.user.type === "administrator") {
        return props.children;
    } else {
        //return <Navigate to="/login" state={{from: location}} replace/>
        return <ErrorPage title="Access denied" name="Home" link="/"/>;
    }
}

export default RequireBuyer;
