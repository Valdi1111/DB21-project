import {Link} from "react-router-dom";

function Notification(props) {

    return (
        <Link to={props.notification.link} className="dropdown-item border-bottom">
            <h6 className="text-primary text-wrap text-break mt-1">{props.notification.title}</h6>
            <p className="text-wrap text-break">{props.notification.description}</p>
            <div className="d-flex flex-row justify-content-between" style={{fontSize: "85%"}}>
                <span className="text-primary">Mark as read</span>
                <span className="text-muted">{props.notification.created}</span>
            </div>
        </Link>
    );

}

export default Notification;