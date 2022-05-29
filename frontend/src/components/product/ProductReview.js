import {useEffect, useState} from "react";
import {avatars_url, api_buyer_url, review_images_url} from "../../services/ApiUrls";
import axios from "axios";
import {toast} from "wc-toast";
import Stars from "./Stars";

function ProductReview(props) {
    const [helpful, setHelpful] = useState(0);
    useEffect(() => {
        if (!props.auth.isLoggedIn()) {
            return;
        }
        axios
            .get(
                `${api_buyer_url}reviews/${props.review.id}/helpful`,
                {headers: props.auth.authHeader()}
            )
            .then(
                res => {
                    if (res.status === 200) {
                        setHelpful(res.data.helpful);
                    }
                },
                err => {
                    // do nothing
                }
            );
    }, []);

    useEffect(() => {
        const tx = document.getElementsByClassName("review-description");
        for (let i = 0; i < tx.length; i++) {
            tx[i].style.height = (tx[i].scrollHeight + 2) + "px";
        }
    }, []);

    function handleHelpful(e) {
        axios
            .post(
                `${api_buyer_url}reviews/${props.review.id}/helpful`,
                {},
                {headers: props.auth.authHeader()}
            )
            .then(
                res => {
                    if (res.status === 200) {
                        setHelpful(1);
                    }
                },
                err => {
                    if (err.response.status === 403) {
                        toast.error("You are not a buyer!");
                    }
                }
            );
    }

    function handleUndo(e) {
        axios
            .delete(
                `${api_buyer_url}reviews/${props.review.id}/helpful`,
                {headers: props.auth.authHeader()}
            )
            .then(
                res => {
                    if (res.status === 200) {
                        setHelpful(0);
                    }
                },
                err => {
                    if (err.response.status === 403) {
                        toast.error("You are not a buyer!");
                    }
                }
            );
    }

    const image = "https://64.media.tumblr.com/8a85be3e602bae04d5e99d3dc64381e9/bdfe9fb06e1bb455-b4/s540x810/9ea94857dc5e85e567d95bc516c864cf5bdba0ea.jpg";
    return (
        <div className="mb-4">
            <div className="d-flex flex-start align-items-center">
                <img className="rounded-circle shadow-1-strong me-3"
                     src={/*avatars_url + props.review.avatars*/image} alt="avatar" width="50" height="50"/>
                <div>
                    <h6 className="fw-bold text-primary mb-1">{props.review.username}</h6>
                    <p className="text-muted small mb-0">{"Shared publicly on " + props.review.created}</p>
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