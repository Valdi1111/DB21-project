import axios from "axios";
import {api_buyer_url} from "../../services/ApiUrls";
import {toast} from "wc-toast";
import {useRef} from "react";
import AuthService from "../../services/AuthService";

function ProductFaqAdd(props) {
    const question = useRef();

    function handleSubmit(e) {
        if (!AuthService.isBuyer()) {
            toast.error("You are not a buyer!");
            return;
        }
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            axios
                .post(
                    `${api_buyer_url}products/${props.product}/faqs`,
                    {
                        question: question.current.value
                    },
                    {headers: AuthService.authHeader()}
                )
                .then(
                    res => {
                        toast.success("Question sent successfully!");
                        document.getElementById("faq-add").classList.remove("show");
                        question.current.value = "";
                    },
                    err => toast.error("An error occurred...")
                );
        } else {
            e.stopPropagation();
        }
        e.target.classList.add("was-validated");
    }

    return (
        <form className="collapse mb-3" id="faq-add" onSubmit={handleSubmit} noValidate={true}>
            <div className="input-group mb-2">
                <label className="input-group-text">Question</label>
                <textarea className="form-control" style={{height: "7rem"}} minLength={100} maxLength={2000}
                          ref={question} required={true}/>
                <div className="invalid-feedback">Question must be at least 100 characters.</div>
            </div>
            <button type="submit" className="btn btn-outline-success btn-block w-100">Commit</button>
        </form>
    );

}

export default ProductFaqAdd;
