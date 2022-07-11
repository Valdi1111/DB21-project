import {useRef} from "react";
import axios from "axios";
import {api_seller_url, product_images_url} from "../../../../services/ApiUrls";
import AuthService from "../../../../services/AuthService";
import {toast} from "wc-toast";

function ProductImage(props) {
    const order = useRef();

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
                err => toast.error("An error occurred...")
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
                {order: order.current.value},
                {headers: AuthService.authHeader()}
            )
            .then(
                res => {
                    toast.success("Product image deleted successfully!");
                    props.refresh();
                },
                err => toast.error("An error occurred...")
            );
    }

    return (
        <div className="col-4">
            <img src={product_images_url + props.image.path} className="img-thumbnail mb-2"
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
