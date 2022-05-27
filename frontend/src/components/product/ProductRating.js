import Stars from "./Stars";
import {createElement} from "react";

function ProductRating(props) {
    let values = [0, 0, 0, 0, 0];

    props.ratings?.forEach((r) => values[r.rating - 1] = (r.amount / props.amount * 100));

    let elems = [];
    for (let i = 5; i > 0; i--) {
        elems.push(
            <div className="d-flex flex-start align-items-center" key={i}>
                <Stars value={i} max_value={5}/>
                <p className="text-muted small mb-0 ms-3">{parseInt(values[i - 1]) + "%"}</p>
            </div>
        );
    }

    let rating = createElement("div", [], elems);
    return (
        <div>
            <div className="d-flex flex-start align-items-center">
                <Stars value={props.average} max_value={5}/>
                <p className="text-muted small mb-0 ms-3">{parseFloat(props.average).toFixed(1) + " out of 5"}</p>
            </div>
            <p className="text-muted small mb-2">{props.amount + " global ratings"}</p>
            {rating}
        </div>
    );

}

export default ProductRating;