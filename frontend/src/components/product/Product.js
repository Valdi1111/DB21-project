import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {api_url} from "../../services/api";
import axios from "axios";
import ProductFaq from "./ProductFaq";
import ProductReview from "./ProductReview";
import AuthService from "../../services/auth-service";
import Stars from "./Stars";
import ProductRating from "./ProductRating";

function Product() {
    const {id} = useParams();

    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [faq, setFaq] = useState([]);
    const [reviewsOrder, setReviewsOrder] = useState("helpful"); // helpful date
    const [reviews, setReviews] = useState([]);
    const [ratings, setRatings] = useState({});

    // get product
    useEffect(() => {
        axios
            .get(
                `${api_url}products/${id}`,
                {headers: AuthService.authHeader()}
            )
            .then((res) => setProduct(res.data));
    }, []);

    // get images
    useEffect(() => {
        axios
            .get(
                `${api_url}products/${id}/images`,
                {headers: AuthService.authHeader()}
            )
            .then((res) => setImages(res.data));
    }, []);

    // get faq
    useEffect(() => {
        axios
            .get(
                `${api_url}products/${id}/faq`,
                {headers: AuthService.authHeader()}
            )
            .then((res) => setFaq(res.data));
    }, []);

    // get ratings
    useEffect(() => {
        axios
            .get(
                `${api_url}products/${id}/ratings`,
                {headers: AuthService.authHeader()}
            )
            .then((res) => setRatings(res.data));
    }, []);

    // get reviews
    useEffect(() => {
        axios
            .get(
                `${api_url}products/${id}/reviews`,
                {
                    headers: AuthService.authHeader(),
                    params: {order_by: reviewsOrder}
                }
            )
            .then((res) => setReviews(res.data));
    }, [reviewsOrder]);

    function handleReviewsOrderChange(e) {
        setReviewsOrder(e.target.value);
    }

    const image = "https://64.media.tumblr.com/8a85be3e602bae04d5e99d3dc64381e9/bdfe9fb06e1bb455-b4/s540x810/9ea94857dc5e85e567d95bc516c864cf5bdba0ea.jpg";
    return (
        <main className="px-3">
            <div className="row mx-0">
                <div id="carouselExampleIndicators" className="px-0 col-4 carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                className="active" aria-current="true" aria-label="Slide 1"/>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                aria-label="Slide 2"/>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                aria-label="Slide 3"/>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
                                aria-label="Slide 4"/>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={image} className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img src={image} className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img src={image} className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img src={image} className="d-block w-100" alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="ps-3 pe-0 col-8">
                    <h3 className="mb-0">{product.title}</h3>
                    <Link className="text-muted"
                          to={"/seller/" + product.seller_id}>{"Visit the " + product.business_name + " store"}</Link>
                    <p className="mt-2 mb-3">{product.description}</p>
                    <span className="btn btn-primary">{product.price?.toFixed(2) + " €"}</span>
                </div>
            </div>
            <div className="border-top mt-3">
                <h4 className="my-3">Customer questions & answers</h4>
                <div className="w-75">
                    {faq?.map(faq => <ProductFaq key={faq.id} faq={faq}/>)}
                </div>
            </div>
            <div className="border-top mt-3">
                <div className="d-flex flex-start align-items-center">
                    <h4 className="col-auto my-3">Customer reviews</h4>
                    <div className="ms-3">
                        <select className="form-select form-select-sm" defaultValue="helpful"
                                onChange={handleReviewsOrderChange}>
                            <option value="helpful">Top reviews</option>
                            <option value="date">Most recent</option>
                        </select>
                    </div>
                </div>
                <div className="row mx-0">
                    <div className="col-9 ps-0">
                        {reviews?.map(review => <ProductReview key={review.id} review={review}/>)}
                    </div>
                    <div className="col-3 pe-0 border-start">
                        {ratings ? <ProductRating amount={ratings.amount} average={ratings.average} ratings={ratings.ratings} /> : <></>}
                    </div>
                </div>
            </div>
        </main>
    );

}

export default Product;