import axios from "axios";
import {api_buyer_url} from "../../services/ApiUrls";
import {toast} from "wc-toast";
import {useRef} from "react";
import FormData from "form-data";

function ProductReviewAdd(props) {
    const title = useRef();
    const description = useRef();
    const rating = useRef();
    const image = useRef();

    function handleSubmit(e) {
        if (!props.auth || props.auth.user.type !== "buyer") {
            toast.error("You are not a buyer!");
            return;
        }
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            let data = new FormData();
            data.append("title", title.current.value);
            data.append("description", description.current.value);
            data.append("rating", rating.current.value);
            if (image.current.files[0]) {
                data.append("image", image.current.files[0], image.current.files[0].name);
            }
            axios
                .post(
                    `${api_buyer_url}products/${props.product}/reviews`,
                    data,
                    {
                        headers: {
                            "content-type": "multipart/form-data",
                            "x-access-token": props.auth.token
                        }
                    }
                )
                .then(
                    res => {
                        toast.success("Review added successfully!");
                        document.getElementById("review-add").classList.remove("show");
                        title.current.value = "";
                        description.current.value = "";
                        rating.current.value = "";
                        image.current.files[0] = null;
                    },
                    err => toast.error("An error occurred...")
                );
        } else {
            e.stopPropagation();
        }
        e.target.classList.add("was-validated");
    }

    return (
        <form className="collapse mb-3" id="review-add" onSubmit={handleSubmit} noValidate={true}>
            <div className="input-group mb-2">
                <label className="input-group-text">Title</label>
                <input type="text" className="form-control" minLength={10} maxLength={100} ref={title} required={true}/>
                <div className="invalid-feedback">Title must be at least 10 characters.</div>
            </div>
            <div className="input-group mb-2">
                <label className="input-group-text">Description</label>
                <textarea style={{height: "7rem"}} className="form-control" minLength={100} maxLength={2000}
                          ref={description} required={true}/>
                <div className="invalid-feedback">Description must be at least 100 characters.</div>
            </div>
            <div className="input-group mb-2">
                <label className="input-group-text">Rating</label>
                <select className="form-select" aria-label="Select rating" ref={rating} required={true}>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                </select>
                <div className="invalid-feedback">You must select a rating.</div>
            </div>
            <div className="input-group mb-2">
                <label className="input-group-text">Image</label>
                <input type="file" className="form-control" accept="image/jpeg,image/png" ref={image}/>
                <div className="invalid-feedback">You may select an image.</div>
            </div>
            <button type="submit" className="btn btn-outline-success btn-block w-100">Commit</button>
        </form>
    );

}

export default ProductReviewAdd;
