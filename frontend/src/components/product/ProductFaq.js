import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import axios from "axios";
import {api_buyer_url} from "../../services/ApiUrls";
import {toast} from "wc-toast";

function ProductFaq(props) {
    const [upvote, setUpvote] = useState(0);
    useEffect(() => {
        const tx = document.getElementsByClassName("area");
        for (let i = 0; i < tx.length; i++) {
            tx[i].style.height = (tx[i].scrollHeight + 2) + "px";
        }
        if (!props.auth || props.auth.user.type !== "buyer") {
            return;
        }
        axios
            .get(
                `${api_buyer_url}products/faqs/${props.faq.id}/upvote`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setUpvote(res.data.upvote));
    }, []);

    function handleChange(value) {
        if (!props.auth || props.auth.user.type !== "buyer") {
            toast.error("You are not a buyer!");
            return;
        }
        axios
            .post(
                `${api_buyer_url}products/faqs/${props.faq.id}/upvote`,
                {vote: value},
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(
                res => setUpvote(value),
                err => toast.error("An error occurred...")
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
                    <div className="col px-0">
                        <textarea className="form-control area" defaultValue={props.faq.question} disabled={true}
                                  style={{resize: "none", overflowY: "hidden"}}/>
                    </div>
                </div>
                <div className="row mx-0">
                    <h6 className="col-auto mb-0" style={{width: "6rem"}}>Answer:</h6>
                    <div className="col px-0">
                        <textarea className="form-control area" defaultValue={props.faq.answer} disabled={true}
                                  style={{resize: "none", overflowY: "hidden"}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductFaq;
