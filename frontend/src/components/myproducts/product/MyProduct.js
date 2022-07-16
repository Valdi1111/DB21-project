import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {api_seller_url, api_url} from "../../../services/ApiUrls";
import {toast} from "wc-toast";
import ProductImage from "./ProductImage";
import ProductAddImage from "./ProductAddImage";
import ProductUnansweredFaq from "./ProductUnansweredFaq";

function MyProduct(props) {
    const {id} = useParams();

    const title = useRef();
    const description = useRef();
    const descriptionFull = useRef();
    const price = useRef();
    const discount = useRef();
    const amount = useRef();
    const visible = useRef();

    const [images, setImages] = useState([]);
    const [faq, setFaq] = useState([]);

    useEffect(() => {
        axios
            .get(
                `${api_seller_url}products/${id}`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(
                res => {
                    title.current.value = res.data.title;
                    description.current.value = res.data.description;
                    descriptionFull.current.value = res.data.description_full;
                    price.current.value = res.data.price.toFixed(2);
                    discount.current.value = res.data.discount.toFixed(1)
                    amount.current.value = res.data.amount;
                    visible.current.checked = res.data.visible;
                }
            );
        refreshImages();
        refreshFaqs();
    }, [id]);

    // get images
    function refreshImages() {
        axios
            .get(`${api_url}products/${id}/images`)
            .then(res => setImages(res.data));
    }

    // get faqs
    function refreshFaqs() {
        axios
            .get(
                `${api_seller_url}products/${id}/faqs`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setFaq(res.data));
    }

    function handleDataChange(e) {
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            axios
                .put(
                    `${api_seller_url}products/${id}`,
                    {
                        title: title.current.value,
                        description: description.current.value,
                        description_full: descriptionFull.current.value,
                        price: parseFloat(price.current.value).toFixed(2),
                        discount: parseFloat(discount.current.value).toFixed(1),
                        amount: amount.current.value,
                        visible: visible.current.checked
                    },
                    {headers: {"x-access-token": props.auth.token}}
                )
                .then(
                    res => toast.success("Product data changed successfully!"),
                    err => toast.error("An error occurred...")
                );
        } else {
            e.stopPropagation();
        }
        e.target.classList.add("was-validated");
    }

    return (
        <main className="flex-grow-1 py-3">
            <div className="row mx-0">
                <h4 className="mb-3 text-center">Change product images</h4>
                {images.map(i => <ProductImage auth={props.auth} key={i.id} image={i} refresh={refreshImages}/>)}
                <div className="col-12">
                    <hr/>
                    <button className="btn btn-outline-secondary w-100" data-bs-toggle="collapse"
                            data-bs-target="#image-add" aria-expanded="false" aria-controls="image-add">Add
                        product image
                    </button>
                </div>
                <div id="image-add" className="col-12 mt-2 collapse">
                    <ProductAddImage auth={props.auth} product={id} refresh={refreshImages}/>
                </div>
            </div>
            <form className="row mx-0 mt-3" onSubmit={handleDataChange} noValidate={true}>
                <h4 className="mb-3 text-center">Change product data</h4>
                <div className="col-10">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Name</label>
                        <input type="text" className="form-control" ref={title} required={true}/>
                        <div className="invalid-feedback">Please insert a valid title.</div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-check form-switch">
                        <label className="form-check-label">Visible</label>
                        <input type="checkbox" className="form-check-input" ref={visible} role="switch"/>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Description</label>
                        <textarea className="form-control" ref={description} style={{height: "5rem"}} minLength={50}
                                  maxLength={150} required={true}/>
                        <div className="invalid-feedback">Description must be at least 50 characters.</div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Description Full</label>
                        <textarea className="form-control" ref={descriptionFull} style={{height: "7rem"}}
                                  minLength={100} maxLength={3000} required={true}/>
                        <div className="invalid-feedback">Description Full must be at least 100 characters.</div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Price</label>
                        <input type="number" className="form-control" ref={price} min={0} step={0.01} required={true}/>
                        <label className="input-group-text">€</label>
                        <div className="invalid-feedback">Please insert a valid price.</div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Discount</label>
                        <input type="number" className="form-control" ref={discount} min={0} step={0.1}
                               required={true}/>
                        <label className="input-group-text">%</label>
                        <div className="invalid-feedback">Please insert a valid discount.</div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Amount</label>
                        <input type="number" className="form-control" ref={amount} min={0} step={1} required={true}/>
                        <div className="invalid-feedback">Please insert a valid amount.</div>
                    </div>
                </div>
                <div className="col-12 text-end">
                    <button type="submit" className="btn btn-outline-success">Submit</button>
                </div>
            </form>
            <div className="mt-3">
                <h4 className="mb-3 text-center">Unanswered questions</h4>
                {faq.map(q => <ProductUnansweredFaq auth={props.auth} key={q.id} faq={q} refresh={refreshFaqs}/>)}
            </div>
        </main>
    );

}

export default MyProduct;
