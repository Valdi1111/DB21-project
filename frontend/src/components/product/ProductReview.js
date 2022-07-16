import {useEffect, useState} from "react";
import {avatars_url, api_buyer_url, review_images_url} from "../../services/ApiUrls";
import axios from "axios";
import {toast} from "wc-toast";
import Stars from "./Stars";
import {formatDate} from "../../services/Utils";

function ProductReview(props) {
    const [helpful, setHelpful] = useState(0);
    useEffect(() => {
        const tx = document.getElementsByClassName("review-description");
        for (let i = 0; i < tx.length; i++) {
            tx[i].style.height = (tx[i].scrollHeight + 2) + "px";
        }
        if (!props.auth || props.auth.user.type !== "buyer") {
            return;
        }
        axios
            .get(
                `${api_buyer_url}products/reviews/${props.review.id}/helpful`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setHelpful(res.data.helpful));
    }, []);

    function handleHelpful(e) {
        if (!props.auth || props.auth.user.type !== "buyer") {
            toast.error("You are not a buyer!");
            return;
        }
        axios
            .post(
                `${api_buyer_url}products/reviews/${props.review.id}/helpful`,
                {},
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(
                res => setHelpful(1),
                err => toast.error("An error occurred...")
            );
    }

    function handleUndo(e) {
        if (!props.auth || props.auth.user.type !== "buyer") {
            toast.error("You are not a buyer!");
            return;
        }
        axios
            .delete(
                `${api_buyer_url}products/reviews/${props.review.id}/helpful`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(
                res => setHelpful(0),
                err => toast.error("An error occurred...")
            );
    }

    return (
        <div className="mb-3">
            <div className="d-flex flex-start align-items-center">
                <img className="rounded-circle shadow-1-strong me-3"
                     src={avatars_url + props.review.avatar} alt="avatar" width="50" height="50"/>
                <div>
                    <h6 className="fw-bold text-primary mb-1">{props.review.username}</h6>
                    <p className="text-muted small mb-0">{"Shared publicly on " + formatDate(props.review.created)}</p>
                </div>
            </div>
            <div>
                <div className="mt-3 d-flex justify-content-start align-items-center">
                    <Stars value={props.review.rating} max_value={5}/>
                    <h6 className="mb-0 ms-2 text-break">{props.review.title}</h6>
                </div>
                <textarea className="mt-2 mb-2 form-control review-description" defaultValue={props.review.description}
                          disabled={true} style={{resize: "none", overflowY: "hidden"}}/>
            </div>
            {props.review.image ?
                <div className="mb-2">
                    <img src={review_images_url + props.review.image} alt="Review image" height={100} width={100}/>
                </div>
                :
                <></>
            }
            <div className="d-flex flex-start align-items-center">
                {helpful ?
                    <button className="btn btn-outline-primary btn-sm px-3" onClick={handleUndo}>Undo</button>
                    :
                    <button className="btn btn-outline-primary btn-sm px-3" onClick={handleHelpful}>Helpful</button>
                }
                <p className="text-muted small mb-0 ms-2">{props.review.upvotes + " people found this helpful"}</p>
            </div>
        </div>
    );

}

export default ProductReview;
