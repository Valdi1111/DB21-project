import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import axios from "axios";
import {api_buyer_url} from "../../services/ApiUrls";
import {toast} from "wc-toast";
import AuthService from "../../services/AuthService";

function ProductFaq(props) {
    const [upvote, setUpvote] = useState(0);
    useEffect(() => {
        if (!AuthService.isBuyer()) {
            return;
        }
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

    useEffect(() => {
        const tx = document.getElementsByClassName("faq-answer");
        for (let i = 0; i < tx.length; i++) {
            tx[i].style.height = (tx[i].scrollHeight + 2) + "px";
        }
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

    function handleUpVote(e) {
        handleChange(upvote === 1 ? 0 : 1)
    }

    function handleDownVote(e) {
        handleChange(upvote === -1 ? 0 : -1)
    }

    function cssUpvote(value) {
        return upvote === value ? {cursor: "pointer", color: "red"} : {cursor: "pointer"};
    }

    return (
        <div className="row mx-0 mb-3">
            <div className="col-auto text-center border-end ps-0">
                <FontAwesomeIcon icon={faChevronUp} onClick={handleUpVote} style={cssUpvote(1)}/>
                <p className="mb-0">{props.faq.upvotes}</p>
                <p className="mb-0">votes</p>
                <FontAwesomeIcon icon={faChevronDown} onClick={handleDownVote} style={cssUpvote(-1)}/>
            </div>
            <div className="col px-0">
                <div className="row mx-0 mb-2">
                    <h6 className="col-auto mb-0" style={{width: "6rem"}}>Question:</h6>
                    <p className="col mb-0 px-0 text-break">{props.faq.question}</p>
                </div>
                <div className="row mx-0">
                    <h6 className="col-auto mb-0" style={{width: "6rem"}}>Answer:</h6>
                    <div className="col px-0">
                        <textarea className="form-control faq-answer" defaultValue={props.faq.answer} disabled={true}
                                  style={{resize: "none", overflowY: "hidden"}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductFaq;
