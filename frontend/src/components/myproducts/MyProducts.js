import {useEffect, useState} from "react";
import $ from "jquery";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {api_seller_url, product_images_url} from "../../services/ApiUrls";

function Product(props) {
    const navigate = useNavigate();

    function handleClick(e) {
        navigate("/my-product/" + props.product.id);
    }

    return (
        <div className="col-3 mb-3">
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

function MyProducts(props) {
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
                {headers: {"x-access-token": props.auth.token}, params: params}
            )
            .then(res => setProducts(res.data));
    }, [page, search]);

    function handleNext(e) {
        setPage(page + 1);
        $(window).scrollTop(0);
    }

    return (
        <main className="flex-grow-1 py-3 row mx-0">
                {products.map(p => <Product key={p.id} product={p}/>)}
                <div className="col-12">
                    <button className="form-control btn btn-primary" onClick={handleNext}>Next</button>
                </div>
        </main>
    );

}

export default MyProducts;
