import {createRef} from "react";
import axios from "axios";
import {api_seller_url} from "../../../../services/ApiUrls";
import AuthService from "../../../../services/AuthService";
import {toast} from "wc-toast";

function ProductImage(props) {
    const order = createRef();

    function deleteImage(e) {
        axios
            .delete(
                `${api_seller_url}products/images/${props.image.id}`,
                {headers: AuthService.authHeader()}
            )
            .then(
                res => {
                    toast.success("Product image updated successfully!");
                    props.refresh();
                },
                err => {
                    toast.error("An error occurred...");
                }
            );
    }

    function updateImage(e) {
        if (!order.current.value) {
            toast.error("Insert a valid number!");
            return;
        }
        axios
            .put(
                `${api_seller_url}products/images/${props.image.id}`,
                {
                    order: order.current.value
                },
                {headers: AuthService.authHeader()}
            )
            .then(
                res => {
                    toast.success("Product image deleted successfully!");
                    props.refresh();
                },
                err => {
                    toast.error("An error occurred...");
                }
            );
    }

    const img = "https://64.media.tumblr.com/8a85be3e602bae04d5e99d3dc64381e9/bdfe9fb06e1bb455-b4/s540x810/9ea94857dc5e85e567d95bc516c864cf5bdba0ea.jpg";

    return (
        <div className="col-4">
            <img src={img/*product_images_url + props.image.path*/} className="img-thumbnail mb-2"
                 alt={"Image " + props.image.order}/>
            <div className="input-group mb-2">
                <label className="input-group-text">Order</label>
                <input type="number" className="form-control" ref={order} min={0} step={1}
                       defaultValue={props.image.order}/>
                <div className="invalid-feedback">Please insert a valid number.</div>
            </div>
            <div className="text-end">
                <button className="btn btn-outline-danger me-2" onClick={deleteImage}>Delete</button>
                <button className="btn btn-outline-success" onClick={updateImage}>Update</button>
            </div>
        </div>
    );

}

export default ProductImage;