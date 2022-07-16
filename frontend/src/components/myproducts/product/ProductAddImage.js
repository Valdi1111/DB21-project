import FormData from "form-data";
import axios from "axios";
import {api_seller_url} from "../../../services/ApiUrls";
import {toast} from "wc-toast";
import ImageSelector from "../../settings/profile/ImageSelector";

function ProductAddImage(props) {

    function handleCommit(blob, done) {
        let data = new FormData();
        data.append("image", blob, "image.png");
        axios
            .post(
                `${api_seller_url}products/${props.product}/images`,
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
                    toast.success("Image added successfully!");
                    done();
                    document.getElementById("image-add").classList.remove("show");
                    props.refresh();
                },
                err => toast.error("An error occurred...")
            );
    }

    return (
        <ImageSelector commit={handleCommit}/>
    );

}

export default ProductAddImage;
