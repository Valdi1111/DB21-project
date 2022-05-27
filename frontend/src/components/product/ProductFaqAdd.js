import axios from "axios";
import {api_buyer_url} from "../../services/api";
import {toast} from "wc-toast";
import AuthService from "../../services/auth-service";
import {useState} from "react";

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
            <div className="form-floating mb-2">
                <textarea style={{height: "7rem"}} id="faq_question" className="form-control" minLength={100}
                          maxLength={2000} placeholder="Question here" onChange={handleQuestionChange} required/>
                <label htmlFor="faq_question">Question</label>
                <div className="invalid-feedback">Question must be at least 100 characters.</div>
            </div>
            <button type="submit" className="btn btn-outline-success btn-block w-100">Commit</button>
        </form>
    );

}

export default ProductFaqAdd;