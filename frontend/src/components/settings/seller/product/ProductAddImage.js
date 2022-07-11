import FormData from "form-data";
import axios from "axios";
import {api_seller_url, api_user_url} from "../../../../services/ApiUrls";
import AuthService from "../../../../services/AuthService";
import {toast} from "wc-toast";
import ImageSelector from "../../profile/ImageSelector";

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
                        "x-access-token": AuthService.token
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
