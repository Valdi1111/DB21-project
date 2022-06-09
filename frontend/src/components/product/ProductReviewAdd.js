import axios from "axios";
import {api_buyer_url} from "../../services/ApiUrls";
import {toast} from "wc-toast";
import {useState} from "react";
import FormData from "form-data";
import AuthService from "../../services/AuthService";

function ProductReviewAdd(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(1);
    const [image, setImage] = useState(null);

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleRatingChange(e) {
        setRating(e.target.value);
    }

    function handleImageChange(e) {
        setImage(e.target.files[0]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            let data = new FormData();
            data.append("title", title);
            data.append("description", description);
            data.append("rating", rating);
            data.append("product", props.product);
            data.append("image", image, image.name);
            axios
                .put(
                    `${api_buyer_url}reviews`,
                    data,
                    {
                        headers: {
                            "content-type": "multipart/form-data",
                            "x-access-token": AuthService.token
                        }
                    }
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
            <div className="input-group mb-2">
                <label className="input-group-text" htmlFor="review_title">Title</label>
                <input id="review_title" type="text" className="form-control" minLength={10} maxLength={100}
                       onChange={handleTitleChange} required/>
                <div className="invalid-feedback">Title must be at least 10 characters.</div>
            </div>
            <div className="input-group mb-2">
                <label className="input-group-text" htmlFor="review_description">Description</label>
                <textarea id="review_description" style={{height: "7rem"}} className="form-control" minLength={100}
                          maxLength={2000} onChange={handleDescriptionChange} required/>
                <div className="invalid-feedback">Description must be at least 100 characters.</div>
            </div>
            <div className="input-group mb-2">
                <label className="input-group-text" htmlFor="review_rating">Rating</label>
                <select id="review_rating" className="form-select" aria-label="Select rating"
                        onChange={handleRatingChange} required>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                </select>
                <div className="invalid-feedback">You must select a rating.</div>
            </div>
            <div className="input-group mb-2">
                <label className="input-group-text" htmlFor="review_image">Image</label>
                <input type="file" id="review_image" className="form-control" accept="image/jpeg,image/png"
                       onChange={handleImageChange}/>
                <div className="invalid-feedback">You may select an image.</div>
            </div>
            <button type="submit" className="btn btn-outline-success btn-block w-100">Commit</button>
        </form>
    );

}

export default ProductReviewAdd;