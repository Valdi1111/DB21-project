import {useNavigate} from "react-router-dom";
import "../../css/shop_product.css"
import {product_images_url} from "../../services/api";

function ShopProduct(props) {
    const navigate = useNavigate();

    function handleClick(e) {
        navigate("/product/" + props.product.id);
    }

    const image = "https://64.media.tumblr.com/8a85be3e602bae04d5e99d3dc64381e9/bdfe9fb06e1bb455-b4/s540x810/9ea94857dc5e85e567d95bc516c864cf5bdba0ea.jpg";
    return (
        <div className="p-2 col-4">
            <div onClick={handleClick} className="card product">
                <img src={/*product_images_url + props.product.cover*/ image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title text-break">{props.product.title}</h5>
                    <p className="card-text text-break">{props.product.description}</p>
                    <span className="btn btn-primary">{props.product.price.toFixed(2) + " €"}</span>
                </div>
            </div>
        </div>
    );

}

export default ShopProduct;