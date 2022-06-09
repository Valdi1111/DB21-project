import {Link} from "react-router-dom";
import axios from "axios";
import {api_user_url} from "../../services/ApiUrls";
import AuthService from "../../services/AuthService";

function Notification(props) {

    function handleRead(e) {
        console.log("read " + props.notification.id);
        axios
            .post(
                `${api_user_url}notifications/${props.notification.id}/read`,
                {},
                {headers: AuthService.authHeader()}
            )
            .then(
                res => {
                    props.read(props.notification.id);
                },
                err => {
                    //
                }
            )
    }

    return (
        <div className="dropdown-item border-bottom">
            <Link to={props.notification.link} className="h6 text-primary text-wrap text-break mt-1">{props.notification.title}</Link>
            <p className="text-wrap text-break">{props.notification.description}</p>
            <div className="d-flex flex-row justify-content-between" style={{fontSize: "85%"}}>
                <span className="text-primary" style={{cursor: "pointer"}} onClick={handleRead}>Mark as read</span>
                <span className="text-muted">{props.notification.created}</span>
            </div>
        </div>
    );

}

export default Notification;