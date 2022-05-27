import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import axios from "axios";
import {api_buyer_url} from "../../services/api";
import AuthService from "../../services/auth-service";
import {toast} from "wc-toast";

function ProductFaq(props) {
    const [upvote, setUpvote] = useState(0);
    useEffect(() => {
        axios
            .get(
                `${api_buyer_url}faqs/${props.faq.id}/upvote`,
                {headers: AuthService.authHeader()}
            )
            .then(
                res => {
                    if (res.status === 200) {
                        setUpvote(res.data.upvote);
                    }
                },
                err => {
                    // do nothing
                }
            );
    }, []);

    function handleChange(value) {
        axios
            .post(
                `${api_buyer_url}faqs/${props.faq.id}/upvote`,
                {vote: value},
                {headers: AuthService.authHeader()}
            )
            .then(
                res => {
                    if (res.status === 200) {
                        setUpvote(value);
                    }
                },
                err => {
                    if (err.response.status === 403) {
                        toast.error("You are not a buyer!");
                    }
                }
            );
    }

    return (
        <div className="row mx-0 mb-3">
            <div className="col-auto text-center border-end px-3">
                <FontAwesomeIcon icon={faChevronUp} onClick={(e) => handleChange(upvote === 1 ? 0 : 1)}
                                 style={upvote === 1 ? {cursor: "pointer", color: "red"} : {cursor: "pointer"}}/>
                <p className="mb-0">{props.faq.upvotes}</p>
                <p className="mb-0">votes</p>
                <FontAwesomeIcon icon={faChevronDown} onClick={(e) => handleChange(upvote === -1 ? 0 : -1)}
                                 style={upvote === -1 ? {cursor: "pointer", color: "red"} : {cursor: "pointer"}}/>
            </div>
            <div className="col">
                <div className="row mx-0 mb-2">
                    <h6 className="col-auto mb-0" style={{width: "6rem"}}>Question:</h6>
                    <p className="col mb-0">{props.faq.question}</p>
                </div>
                <div className="row mx-0">
                    <h6 className="col-auto mb-0" style={{width: "6rem"}}>Answer:</h6>
                    <p className="col mb-0">{props.faq.answer}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductFaq;
