import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {createElement} from "react";

function Stars(props) {
    let elems = [];
    for (let i = 1; i <= props.max_value; i++) {
        if (i <= props.value) {
            elems.push(<FontAwesomeIcon key={i} icon={faStar} style={{color: "#fbc634"}}/>);
        } else {
            elems.push(<FontAwesomeIcon key={i} icon={faStar} style={{color: "lightgray"}}/>);
        }
    }

    let rating = createElement("div", [], elems);
    return (rating);

}

export default Stars;