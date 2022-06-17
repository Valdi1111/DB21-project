import axios from "axios";
import {toast} from "wc-toast";
import AuthService from "../../../../services/AuthService";
import {api_seller_url} from "../../../../services/ApiUrls";
import {createRef} from "react";

function ProductUnansweredFaq(props) {
    const answer = createRef();

    function handleSubmit(e) {
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            axios
                .put(
                    `${api_seller_url}faqs/${props.faq.id}`,
                    {answer: answer.current.value},
                    {headers: AuthService.authHeader()}
                )
                .then(
                    res => {
                        toast.success("Faq updated successfully!");
                        props.refresh();
                    },
                    err => {
                        toast.error("An error occurred...");
                    }
                );
        } else {
            e.stopPropagation();
        }
        e.target.classList.add("was-validated");
    }

    function handleDelete(e) {
        axios
            .delete(
                `${api_seller_url}faqs/${props.faq.id}`,
                {headers: AuthService.authHeader()}
            )
            .then(
                res => {
                    toast.success("Faq deleted successfully!");
                    props.refresh();
                },
                err => {
                    toast.error("An error occurred...");
                }
            );
    }

    return (
        <form onSubmit={handleSubmit} noValidate={true}>
            <div className="row mx-0 mb-2">
                <h6 className="col-auto mb-0" style={{width: "6rem"}}>Question:</h6>
                <p className="col mb-0 text-break">{props.faq.question}</p>
            </div>
            <div className="row mx-0">
                <h6 className="col-auto mb-0" style={{width: "6rem"}}>Answer:</h6>
                <div className="col">
                    <textarea className="form-control" ref={answer} style={{height: "7rem"}} minLength={100}
                              maxLength={2000} required={true}/>
                    <div className="invalid-feedback">Answer must be at least 100 characters.</div>
                </div>
            </div>
            <div className="row mx-0 mt-2">
                <div className="col-12 text-end">
                    <button type="button" className="btn btn-outline-danger me-2" onClick={handleDelete}>Delete</button>
                    <button type="submit" className="btn btn-outline-success">Submit</button>
                </div>
            </div>
        </form>
    );

}

export default ProductUnansweredFaq;