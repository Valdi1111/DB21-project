import ShopProduct from "./ShopProduct";
import {useEffect, useState} from "react";
import $ from "jquery";
import axios from 'axios';
import {api_url} from "../../services/api";

function Shop() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios
            .get(
                `${api_url}categories`
            )
            .then(
                res => setCategories(res.data)
            );
    }, []);

    const [category, setCategory] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        let params = {};
        if (category) {
            params.category = category;
        }
        if (minPrice) {
            params.min_price = minPrice;
        }
        if (maxPrice) {
            params.max_price = maxPrice;
        }
        console.log("update: " + JSON.stringify(params));
        axios
            .get(
                `${api_url}products`,
                {params}
            )
            .then(
                res => setProducts(res.data)
            );
    }, [category, minPrice, maxPrice]);

    function onCategoryClick(e) {
        if (e.target.id === category) {
            $(e.target).toggleClass("active");
            setCategory(null);
            return;
        }
        $(".category").removeClass("active");
        $(e.target).addClass("active");
        setCategory(e.target.id);
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
        } else {
            setMaxPrice(null);
        }
    }

    return (
        <main className="mx-0 row">
            <aside className="px-3 col-3 border-end">
                <nav className="card navbar navbar-light rounded flex-column align-items-stretch py-0 mt-2">
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
            <div className="px-3 col-9">
                <div className="row mx-0">
                    {products?.map(p => <ShopProduct key={p.id} product={p}/>)}
                </div>
            </div>
        </main>
    );

}

export default Shop;