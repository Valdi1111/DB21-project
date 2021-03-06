import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import axios from "axios";
import {api_user_url} from "../../services/ApiUrls";
import Notification from "./Notification";
import {Link} from "react-router-dom";

function Notifications(props) {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        axios
            .get(
                `${api_user_url}notifications`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setNotifications(res.data))
    }, []);

    function readNotification(id) {
        setNotifications(notifications.filter(n => n.id !== id));
    }

    function notificationNumber() {
        if(!notifications || !notifications.length) {
            return <></>;
        }
        return <span className="position-absolute top-0 start-50 translate-middle-y badge rounded-pill bg-danger"
                     style={{fontSize: "70%", padding: ".25rem .35rem"}}>{notifications?.length}</span>;
    }

    return (
        <div className="dropdown text-end">
            {/* SOTTO dropdown-toggle */}
            <div className="p-1 me-2" style={{cursor: "pointer", width: 32, height: 32}}
                 id="dropdown-notifications" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="position-relative w-100 h-100">
                    <FontAwesomeIcon icon={faBell} className="text-secondary w-100 h-100"/>
                    {notificationNumber()}
                </div>
            </div>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-notifications" style={{width: "21rem"}}>
                <ul className="overflow-auto text-small list-unstyled mb-0" style={{height: "23rem"}}>
                    <div className="d-flex flex-row justify-content-between border-bottom pb-2 px-3">
                        <h6 className="text-uppercase mb-0">Unread notifications</h6>
                        <Link to="/settings/notifications" style={{fontSize: "85%", cursor: "pointer"}}>Show all</Link>
                    </div>
                    {notifications?.map(n => <li key={n.id}><Notification auth={props.auth} notification={n} read={readNotification}/></li>)}
                </ul>
            </div>
        </div>
    );

}

export default Notifications;
