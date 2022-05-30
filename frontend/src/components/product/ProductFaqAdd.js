import axios from "axios";
import {api_buyer_url} from "../../services/ApiUrls";
import {toast} from "wc-toast";
import {useState} from "react";
import AuthService from "../../services/AuthService";

function ProductFaqAdd(props) {
    const [question, setQuestion] = useState("");

    function handleQuestionChange(e) {
        setQuestion(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            axios
                .post(
                    `${api_buyer_url}faqs`,
                    {
                        question: question,
                        product: props.product
                    },
                    {headers: AuthService.authHeader()}
                )
                .then(
                    res => {
                        if (res.status === 200) {
                            toast.success("Question sent successfully!");
                        }
                    },
                    err => {
                        if (err.response.status === 403) {
                            toast.error("You are not a buyer!");
                        } else {
                            toast.error("An error occurred...");
                        }
                    }
                );
        } else {
            e.stopPropagation();
        }
        e.target.classList.add("was-validated");
    }

    return (
        <form className="collapse mb-3" id="faq-add" onSubmit={handleSubmit} noValidate={true}>
            <div className="input-group mb-2">
                <label className="input-group-text" htmlFor="faq_question">Question</label>
                <textarea id="faq_question" className="form-control" style={{height: "7rem"}} minLength={100}
                          maxLength={2000} onChange={handleQuestionChange} required/>
                <div className="invalid-feedback">Question must be at least 100 characters.</div>
            </div>
            <button type="submit" className="btn btn-outline-success btn-block w-100">Commit</button>
        </form>
    );

}

export default ProductFaqAdd;