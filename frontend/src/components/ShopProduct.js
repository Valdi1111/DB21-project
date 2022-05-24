import {useNavigate} from "react-router-dom";
import "../css/shop_product.css"
import {api_image_url} from "../services/api";

function ShopProduct(props) {
    const navigate = useNavigate();

    function handleClick(e) {
        navigate("/product/" + props.product.id);
    }

    return (
        <div className="d-inline-block p-2">
            <div onClick={handleClick} className="card" style={{width: "18rem"}}>
                <img src={/*api_image_url + */props.product.cover} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{props.product.title}</h5>
                    <p className="card-text">{props.product.description}</p>
                    <span className="btn btn-primary">{props.product.price.toFixed(2) + " €"}</span>
                </div>
            </div>
        </div>
    );

}

export default ShopProduct;