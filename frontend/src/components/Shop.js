import {useEffect, useState} from "react";
import $ from "jquery";
import axios from 'axios';
import {api_url, product_images_url} from "../services/ApiUrls";
import "../css/product_card.css"
import {useNavigate} from "react-router-dom";
import {formatPrice} from "../services/Utils";

function ShopProduct(props) {
    const navigate = useNavigate();

    function handleClick(e) {
        navigate("/product/" + props.product.id);
    }

    function getPrice() {
        if (props.product.discount === 0) {
            return (
                <span className="btn btn-primary">
                    {formatPrice(props.product.price)}
                </span>
            );
        }
        return (
            <>
                <span className="d-inline-block btn btn-primary text-">
                    <del>{formatPrice(props.product.price)}</del>
                </span>
                <span className="d-inline-block btn btn-primary ms-2">
                    {formatPrice(props.product.current_price)}
                </span>
            </>
        );
    }

    return (
        <div className="col-4 mb-3">
            <div onClick={handleClick} className="card product">
                <img src={product_images_url + props.product.cover} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title text-break">{props.product.title}</h5>
                    <p className="card-text text-break">{props.product.description}</p>
                    <div>{getPrice()}</div>
                </div>
            </div>
        </div>
    );

}

function Shop() {
    const productsPerPage = 12;
    const [page, setPage] = useState(0);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios
            .get(`${api_url}categories`)
            .then(res => setCategories(res.data));
    }, []);

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    useEffect(() => {
        let params = {limit: productsPerPage, offset: productsPerPage * page};
        if (category) {
            params.category = category;
        }
        if (minPrice) {
            params.min_price = minPrice;
        }
        if (maxPrice) {
            params.max_price = maxPrice;
        }
        axios
            .get(
                `${api_url}products`,
                {params: params}
            )
            .then(res => setProducts(res.data));
    }, [category, minPrice, maxPrice, page]);

    function onCategoryClick(e) {
        if (e.target.id === category) {
            $(e.target).toggleClass("active");
            setCategory(null);
            setPage(0);
            return;
        }
        $(".category").removeClass("active");
        $(e.target).addClass("active");
        setCategory(e.target.id);
        setPage(0);
    }

    function onPriceClick(e) {
        let min = $("#min_price").val();
        if (min) {
            setMinPrice(min);
        } else {
            setMinPrice(null);
        }
        let max = $("#max_price").val();
        if (max) {
            setMaxPrice(max);
            setPage(0);
        } else {
            setMaxPrice(null);
            setPage(0);
        }
    }

    function handleNext(e) {
        setPage(page + 1);
        $(window).scrollTop(0);
    }

    return (
        <main className="flex-grow-1 py-3 row mx-0">
            <aside className="col-3 border-end">
                {/* SOTTO navbar navbar-light */}
                <nav className="card rounded flex-column align-items-stretch py-0">
                    <h5 className="card-header p-3">Categories</h5>
                    <nav className="card-body nav nav-pills flex-column">
                        {/*
                        <a className="nav-link" href="#item-1">Item 1</a>
                        <nav className="nav nav-pills flex-column">
                            <a className="nav-link ms-3 my-1" href="#item-1-1">Item 1-1</a>
                            <a className="nav-link ms-3 my-1" href="#item-1-2">Item 1-2</a>
                        </nav>
                        <a className="nav-link" href="#item-2">Item 2</a>
                        <a className="nav-link" href="#item-3">Item 3</a>
                        <nav className="nav nav-pills flex-column">
                            <a className="nav-link ms-3 my-1" href="#item-3-1">Item 3-1</a>
                            <a className="nav-link ms-3 my-1" href="#item-3-2">Item 3-2</a>
                        </nav>
                        */}
                        {categories?.map(c => <span className="nav-link category" key={c.id} id={c.id}
                                                    onClick={onCategoryClick}
                                                    style={{cursor: "pointer"}}>{c.name}</span>)}
                    </nav>
                </nav>
                <div className="card mt-2">
                    <h5 className="card-header p-3">Price</h5>
                    <div className="card-body">
                        <div className="row g-2 mx-0">
                            <div className="col-6 mb-2">
                                <input type="number" id="min_price" className="form-control" placeholder="Min"
                                       required/>
                            </div>
                            <div className="col-6 mb-2">
                                <input type="number" id="max_price" className="form-control" placeholder="Max"
                                       required/>
                            </div>
                            <div className="col-12 mb-2">
                                <button type="submit" className="btn btn-outline-primary w-100"
                                        onClick={onPriceClick}>Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <div id="products-view" className="px-0 col-9">
                <div className="row mx-0">
                    {products?.map(p => <ShopProduct key={p.id} product={p}/>)}
                </div>
                <div className="row mx-0">
                    <div className="col-12">
                        <button className="form-control btn btn-primary" onClick={handleNext}>Next</button>
                    </div>
                </div>
            </div>
        </main>
    );

}

export default Shop;
