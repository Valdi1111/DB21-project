import {Navigate, useLocation} from "react-router-dom";

function RequireSeller(props) {
    //let location = useLocation();

    if (props.auth && props.auth.user.type === "seller") {
        return props.children;
    } else {
        //return <Navigate to="/login" state={{from: location}} replace/>
        return <></>;
    }
}

export default RequireSeller;
