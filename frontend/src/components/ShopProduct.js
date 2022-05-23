import {useNavigate} from "react-router-dom";
import "../css/shop_product.css"

function ShopProduct(props) {
    const navigate = useNavigate();
    function handleClick(e) {
        navigate("/product/" + props.id);
    }

    return (
        <div onClick={handleClick} className="card" style={{width: "18rem"}}>
            <img src={props.image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <span className="btn btn-primary">{props.price.toFixed(2) + " €"}</span>
            </div>
        </div>
    );

}

export default ShopProduct;