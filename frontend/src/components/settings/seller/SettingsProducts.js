import {useEffect, useState} from "react";
import $ from "jquery";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {api_seller_url} from "../../../services/ApiUrls";
import AuthService from "../../../services/AuthService";

function Product(props) {
    const navigate = useNavigate();

    function handleClick(e) {
        navigate("../product/" + props.product.id);
    }

    const image = "https://64.media.tumblr.com/8a85be3e602bae04d5e99d3dc64381e9/bdfe9fb06e1bb455-b4/s540x810/9ea94857dc5e85e567d95bc516c864cf5bdba0ea.jpg";
    return (
        <div className="col-4 mb-3">
            <div onClick={handleClick} className="card product">
                <img src={/*product_images_url + props.product.cover*/ image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title text-break">{props.product.title}</h5>
                    <p className="card-text text-break">{props.product.description}</p>
                    {/*<span className="btn btn-primary">{props.product.price.toFixed(2) + " €"}</span>*/}
                </div>
            </div>
        </div>
    );

}

function SettingsProducts() {
    const productsPerPage = 12;
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState(null);

    const [products, setProducts] = useState([]);
    useEffect(() => {
        let params = {limit: productsPerPage, offset: productsPerPage * page};
        if (search) {
            params.search = search;
        }
        axios
            .get(
                `${api_seller_url}products`,
                {headers: AuthService.authHeader(), params: params}
            )
            .then(
                res => setProducts(res.data)
            );
    }, [page, search]);

    useEffect(() => {
        $(".menu").removeClass("active");
        $("#products").addClass("active");
    }, []);

    return (
        <div className="row mx-0">
            {products.map(p => <Product key={p.id} product={p}/>)}
        </div>
    );

}

export default SettingsProducts;