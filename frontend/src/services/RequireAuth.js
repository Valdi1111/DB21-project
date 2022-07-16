import {Navigate, useLocation} from "react-router-dom";

function RequireAuth(props) {
    //let location = useLocation();

    if (props.auth) {
        return props.children;
    } else {
        //return <Navigate to="/login" state={{from: location}} replace/>
        return <></>;
    }
}

export default RequireAuth;
