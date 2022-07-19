import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {api_seller_url, api_url} from "../../../services/ApiUrls";
import {toast} from "wc-toast";
import ProductImage from "./ProductImage";
import ProductAddImage from "./ProductAddImage";
import ProductUnansweredFaq from "./ProductUnansweredFaq";

function MyProductAdd(props) {
    const title = useRef();
    const description = useRef();
    const descriptionFull = useRef();
    const price = useRef();
    const discount = useRef();
    const amount = useRef();

    useEffect(() => {
    }, []);

    function handleAdd(e) {
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            axios
                .post(
                    `${api_seller_url}products`,
                    {
                        title: title.current.value,
                        description: description.current.value,
                        description_full: descriptionFull.current.value,
                        price: parseFloat(price.current.value).toFixed(2),
                        discount: parseFloat(discount.current.value).toFixed(1),
                        amount: amount.current.value,
                    },
                    {headers: {"x-access-token": props.auth.token}}
                )
                .then(
                    res => toast.success("Product added successfully!"),
                    err => toast.error("An error occurred...")
                );
        } else {
            e.stopPropagation();
        }
        e.target.classList.add("was-validated");
    }

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form className="modal-content" onSubmit={handleAdd} noValidate={true}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Add product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body px-0">
                        <div className="row mx-0">
                            <div className="col-12">
                                <div className="input-group mb-2">
                                    <label className="input-group-text">Name</label>
                                    <input type="text" className="form-control" ref={title} required={true}/>
                                    <div className="invalid-feedback">Please insert a valid title.</div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="input-group mb-2">
                                    <label className="input-group-text">Description</label>
                                    <textarea className="form-control" ref={description} style={{height: "5rem"}}
                                              minLength={50}
                                              maxLength={150} required={true}/>
                                    <div className="invalid-feedback">Description must be at least 50 characters.</div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="input-group mb-2">
                                    <label className="input-group-text">Description Full</label>
                                    <textarea className="form-control" ref={descriptionFull} style={{height: "7rem"}}
                                              minLength={100} maxLength={3000} required={true}/>
                                    <div className="invalid-feedback">Description Full must be at least 100
                                        characters.
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-group mb-2">
                                    <label className="input-group-text">Price</label>
                                    <input type="number" className="form-control" ref={price} min={0} step={0.01}
                                           required={true}/>
                                    <label className="input-group-text">€</label>
                                    <div className="invalid-feedback">Please insert a valid price.</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-group mb-2">
                                    <label className="input-group-text">Discount</label>
                                    <input type="number" className="form-control" ref={discount} min={0} step={0.1}
                                           required={true}/>
                                    <label className="input-group-text">%</label>
                                    <div className="invalid-feedback">Please insert a valid discount.</div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-group">
                                    <label className="input-group-text">Amount</label>
                                    <input type="number" className="form-control" ref={amount} min={0} step={1}
                                           required={true}/>
                                    <div className="invalid-feedback">Please insert a valid amount.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" className="btn btn-success">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default MyProductAdd;
