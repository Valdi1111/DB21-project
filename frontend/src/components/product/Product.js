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

function Product(props) {
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
    }, []);

    // get images
    useEffect(() => {
        axios
            .get(
                `${api_url}products/${id}/images`
            )
            .then(
                res => setImages(res.data)
            );
    }, []);

    // get faqs
    useEffect(() => {
        axios
            .get(
                `${api_url}products/${id}/faqs`
            )
            .then(
                res => setFaq(res.data)
            );
    }, []);

    // get ratings
    useEffect(() => {
        axios
            .get(
                `${api_url}products/${id}/ratings`
            )
            .then(
                res => setRatings(res.data)
            );
    }, []);

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
    }, [reviewsOrder]);

    function handleReviewsOrderChange(e) {
        setReviewsOrder(e.target.value);
    }

    return (
        <main className="px-3">
            <div className="row mx-0 mt-3">
                <ProductImage images={images} />
                <div className="ps-3 pe-0 col-8">
                    <h3 className="mb-0">{product.title}</h3>
                    <Link className="text-muted"
                          to={"/seller/" + product.seller_id}>{"Visit the " + product.business_name + " store"}</Link>
                    <p className="mt-2 mb-3">{product.description}</p>
                    <span className="btn btn-primary">{product.price?.toFixed(2) + " €"}</span>
                </div>
            </div>
            <div className="border-top mt-3">
                <div className="d-flex flex-start align-items-center">
                    <h4 className="col-auto my-3">Customer questions & answers</h4>
                    {
                        props.auth.isLoggedIn() && props.auth.isBuyer()
                            ?
                            <button className="btn btn-outline-secondary btn-sm ms-2" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#faq-add" aria-expanded="false" aria-controls="faq-add">
                                Ask question
                            </button>
                            :
                            <></>
                    }
                </div>
                <div className="w-75">
                    <ProductFaqAdd auth={props.auth} product={product.id} />
                    {faq?.map(faq => <ProductFaq auth={props.auth} key={faq.id} faq={faq}/>)}
                </div>
            </div>
            <div className="border-top mt-3">
                <div className="row mx-0">
                    <div className="col-9 ps-0">
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
                                props.auth.isLoggedIn() && props.auth.isBuyer()
                                    ?
                                    <button className="btn btn-outline-secondary btn-sm ms-2" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#review-add" aria-expanded="false" aria-controls="review-add">
                                        Add review
                                    </button>
                                    :
                                    <></>
                            }
                        </div>
                        <ProductReviewAdd auth={props.auth} product={product.id} />
                        {reviews?.map(review => <ProductReview auth={props.auth} key={review.id} review={review}/>)}
                    </div>
                    <div className="col-3 pe-0 border-start">
                        <h4 className="my-3">Customer reviews</h4>
                        {ratings ? <ProductRating amount={ratings.amount} average={ratings.average}
                                                  ratings={ratings.ratings}/> : <></>}
                    </div>
                </div>
            </div>
        </main>
    );

}

export default Product;