import axios from "axios";
import {api_buyer_url} from "../../services/api";
import {toast} from "wc-toast";
import AuthService from "../../services/auth-service";
import {useState} from "react";

function ProductReviewAdd(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleRatingChange(e) {
        setRating(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            axios
                .post(
                    `${api_buyer_url}reviews`,
                    {
                        title: title,
                        description: description,
                        rating: rating,
                        product: props.product
                    },
                    {headers: AuthService.authHeader()}
                )
                .then(
                    res => {
                        if (res.status === 200) {
                            toast.success("Review added successfully!");
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
        <form className="collapse mb-3" id="review-add" onSubmit={handleSubmit} noValidate={true}>
            <div className="form-floating mb-2">
                <input type="text" id="review_title" className="form-control" placeholder="Title here" minLength={10}
                       maxLength={100} onChange={handleTitleChange} required/>
                <label htmlFor="review_title">Title</label>
                <div className="invalid-feedback">Title must be at least 10 characters.</div>
            </div>
            <div className="form-floating mb-2">
                <textarea style={{height: "7rem"}} id="review_description" className="form-control" minLength={100}
                          maxLength={2000} placeholder="Description here" onChange={handleDescriptionChange} required/>
                <label htmlFor="review_description">Description</label>
                <div className="invalid-feedback">Description must be at least 100 characters.</div>
            </div>
            <div className="form-floating mb-2">
                <select id="review_rating" className="form-select" aria-label="Select rating"
                        onChange={handleRatingChange} required>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                </select>
                <label htmlFor="review_rating">Rating</label>
                <div className="invalid-feedback">You must select a rating.</div>
            </div>
            <button type="submit" className="btn btn-outline-success btn-block w-100">Commit</button>
        </form>
    );

}

export default ProductReviewAdd;