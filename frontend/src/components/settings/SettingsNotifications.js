import {useEffect, useState} from "react";
import $ from "jquery";
import axios from "axios";
import {api_user_url} from "../../services/ApiUrls";
import AuthService from "../../services/AuthService";
import {Link} from "react-router-dom";
import {getNotificationLink} from "../../services/Utils";

function Notification(props) {
    return (
        <div className="card">
            <div className="card-body">
                <Link to={getNotificationLink(props.notification)}
                      className="h6 text-primary text-wrap text-break mt-1">{props.notification.title}</Link>
                <p className="text-wrap text-break">{props.notification.description}</p>
                <div className="d-flex flex-row justify-content-end" style={{fontSize: "85%"}}>
                    <span className="text-muted">{props.notification.created}</span>
                </div>
            </div>
        </div>
    );
}

function SettingsNotifications() {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        axios
            .get(
                `${api_user_url}notifications/history`,
                {headers: AuthService.authHeader()}
            )
            .then(res => setNotifications(res.data))
    }, []);

    useEffect(() => {
        $(".menu").removeClass("active");
        $("#notifications").addClass("active");
    }, []);

    return (
        <div className="row mx-0">
            {notifications.map(n => <div key={n.id} className="col-6 mb-3"><Notification notification={n}/></div>)}
        </div>
    );

}

export default SettingsNotifications;
