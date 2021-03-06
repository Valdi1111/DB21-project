import {Link} from "react-router-dom";
import axios from "axios";
import {api_user_url} from "../../services/ApiUrls";
import {formatDateTime, getNotificationLink} from "../../services/Utils";
import {toast} from "wc-toast";

function Notification(props) {

    function handleRead(e) {
        axios
            .post(
                `${api_user_url}notifications/${props.notification.id}/read`,
                {},
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(
                res => props.read(props.notification.id),
                err => toast.error("An error occurred...")
            );
    }

    return (
        <div className="dropdown-item border-bottom">
            <Link to={getNotificationLink(props.notification)}
                  className="h6 text-primary text-wrap text-break mt-1">{props.notification.title}</Link>
            <p className="text-wrap text-break">{props.notification.description}</p>
            <div className="d-flex flex-row justify-content-between" style={{fontSize: "85%"}}>
                <span className="text-primary" style={{cursor: "pointer"}} onClick={handleRead}>Mark as read</span>
                <span className="text-muted">{formatDateTime(props.notification.created)}</span>
            </div>
        </div>
    );

}

export default Notification;
