import {Navigate, useLocation} from "react-router-dom";

function RequireBuyer(props) {
    //let location = useLocation();

    if (props.auth && props.auth.user.type === "buyer") {
        return props.children;
    } else {
        //return <Navigate to="/login" state={{from: location}} replace/>
        return <></>;
    }
}

export default RequireBuyer;
