import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {api_url} from "../../services/ApiUrls";
import axios from "axios";
import ProductFaq from "./ProductFaq";
import ProductReview from "./ProductReview";
import ProductRating from "./ProductRating";
import ProductImage from "./ProductImage";
import ProductFaqAdd from "./ProductFaqAdd";
import ProductReviewAdd from "./ProductReviewAdd";
import AuthService from "../../services/AuthService";

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
                `${api_url}products/${id}`
            )
            .then(
                res => setProduct(res.data)
            );
    }, [id]);

    // get images
    useEffect(() => {
        axios
            .get(
                `${api_url}products/${id}/images`
            )
            .then(
                res => setImages(res.data)
            );
    }, [id]);

    // get faqs
    useEffect(() => {
        axios
            .get(
                `${api_url}products/${id}/faqs`
            )
            .then(
                res => setFaq(res.data)
            );
    }, [id]);

    // get ratings
    useEffect(() => {
        axios
            .get(
                `${api_url}products/${id}/ratings`
            )
            .then(
                res => setRatings(res.data)
            );
    }, [id]);

    // get reviews
    useEffect(() => {
        axios
            .get(
                `${api_url}products/${id}/reviews`,
                {params: {order_by: reviewsOrder}}
            )
            .then(
                res => setReviews(res.data)
            );
    }, [id, reviewsOrder]);

    function handleReviewsOrderChange(e) {
        setReviewsOrder(e.target.value);
    }

    return (
        <main>
            <div className="row mx-0 my-3">
                <div className="col-12 col-sm-9 col-md-7 col-lg-4 mx-auto">
                    <ProductImage images={images}/>
                </div>
                <div className="col-12 col-lg-8 mt-3 mt-lg-0">
                    <h3 className="mb-0">{product.title}</h3>
                    <Link className="text-muted"
                          to={"/seller/" + product.seller_id}>{"Visit the " + product.business_name + " store"}</Link>
                    <p className="mt-2 mb-3">{product.description}</p>
                    <span className="btn btn-primary">{product.price?.toFixed(2) + " €"}</span>
                </div>
            </div>
            <div className="row mx-0 border-top">
                <div className="d-flex flex-start align-items-center">
                    <h4 className="col-auto my-3">Customer questions & answers</h4>
                    {
                        AuthService.isBuyer()
                            ?
                            <button className="btn btn-outline-secondary btn-sm ms-2" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faq-add" aria-expanded="false" aria-controls="faq-add">
                                Ask question
                            </button>
                            :
                            <></>
                    }
                </div>
                <div className="row mx-0">
                    <div className="col col-lg-9 px-0">
                        <ProductFaqAdd product={product.id}/>
                        {faq?.map(faq => <ProductFaq key={faq.id} faq={faq}/>)}
                    </div>
                </div>
            </div>
            <div className="row mx-0 border-top">
                <div className="col-12 col-lg-3">
                    <h4 className="my-3">Ratings</h4>
                    {ratings ? <ProductRating amount={ratings.amount} average={ratings.average}
                                              ratings={ratings.ratings}/> : <></>}
                </div>
                <div className="col-12 col-lg-9">
                    <div className="d-flex flex-start align-items-center">
                        <h4 className="col-auto my-3">Customer reviews</h4>
                        <div className="ms-3">
                            <select className="form-select form-select-sm" defaultValue="helpful"
                                    onChange={handleReviewsOrderChange}>
                                <option value="helpful">Top reviews</option>
                                <option value="date">Most recent</option>
                            </select>
                        </div>
                        {
                            AuthService.isBuyer()
                                ?
                                <button className="btn btn-outline-secondary btn-sm ms-2" type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#review-add" aria-expanded="false" aria-controls="review-add">
                                    Add review
                                </button>
                                :
                                <></>
                        }
                    </div>
                    <ProductReviewAdd product={product.id}/>
                    {reviews?.map(review => <ProductReview key={review.id} review={review}/>)}
                </div>
            </div>
        </main>
    );

}

export default Product;