import {useEffect, useState} from "react";
import $ from "jquery";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {api_seller_url, product_images_url} from "../../../services/ApiUrls";
import AuthService from "../../../services/AuthService";

function Product(props) {
    const navigate = useNavigate();

    function handleClick(e) {
        navigate("../product/" + props.product.id);
    }

    return (
        <div className="col-4 mb-3">
            <div onClick={handleClick} className="card product">
                <img src={product_images_url + props.product.cover} className="card-img-top" alt="..."/>
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

    useEffect(() => {
        $(".menu").removeClass("active");
        $("#products").addClass("active");
    }, []);

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
            .then(res => setProducts(res.data));
    }, [page, search]);

    function handleNext(e) {
        setPage(page + 1);
        $(window).scrollTop(0);
    }

    return (
        <>
            <div className="row mx-0">
                {products.map(p => <Product key={p.id} product={p}/>)}
            </div>
            <div className="row mx-0">
                <div className="col-12">
                    <button className="form-control btn btn-primary" onClick={handleNext}>Next</button>
                </div>
            </div>
        </>
    );

}

export default SettingsProducts;
