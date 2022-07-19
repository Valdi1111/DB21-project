import {useEffect, useRef, useState} from "react";
import $ from "jquery";
import axios from "axios";
import {api_buyer_url} from "../../../services/ApiUrls";
import {toast} from "wc-toast";

function SettingsPayments(props) {
    const [payments, setPayments] = useState([]);
    const type = useRef();
    const number = useRef();
    const owner = useRef();
    const expire = useRef();

    useEffect(() => {
        $(".menu").removeClass("active");
        $("#payments").addClass("active");
        refresh();
    }, []);

    function refresh() {
        axios
            .get(
                `${api_buyer_url}payments`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setPayments(res.data));
    }

    function onAdd(e) {
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            axios
                .post(
                    `${api_buyer_url}payments`,
                    {
                        type: type.current.value,
                        number: number.current.value,
                        owner: owner.current.value,
                        expire: expire.current.value
                    },
                    {headers: {"x-access-token": props.auth.token}}
                )
                .then(
                    res => {
                        toast.success("Payment added successfully!");
                        $("#payment-add").removeClass("show")
                        type.current.value = "";
                        number.current.value = "";
                        owner.current.value = "";
                        expire.current.value = "";
                        refresh();
                    },
                    err => toast.error("An error occurred...")
                );
        } else {
            e.stopPropagation();
        }
        e.target.classList.add("was-validated");
    }

    function AddPayment() {
        return (
            <form id="payment-add" className="row mx-0 mt-3 collapse" onSubmit={onAdd} noValidate={true}>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Type</label>
                        <select className="form-select" aria-label="Select cc type" ref={type} required={true}>
                            <option value="visa">Visa</option>
                            <option value="mastercard">Master Card</option>
                            <option value="american_express">American Express</option>
                            <option value="discover">Discover</option>
                        </select>
                        <div className="invalid-feedback">Please insert a valid credit card type.</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Number</label>
                        <input type="tel" className="form-control" ref={number} inputMode="numeric" maxLength={19}
                               pattern="[0-9\s]{13,19}" placeholder="0000 0000 0000 0000" required={true}/>
                        <div className="invalid-feedback">Please insert a valid credit card number.</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Owner</label>
                        <input type="text" className="form-control" ref={owner} required={true}/>
                        <div className="invalid-feedback">Please insert a valid credit card owner.</div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Expire</label>
                        <input type="month" className="form-control" ref={expire} required={true}/>
                        <div className="invalid-feedback">Please insert a valid credit card expire date.</div>
                    </div>
                </div>
                <div className="col-2">
                    <button type="submit" className="btn btn-outline-success w-100">Submit</button>
                </div>
            </form>
        );

    }

    function onDelete(id) {
        axios
            .delete(
                `${api_buyer_url}payments/${id}`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(
                res => {
                    toast.success("Payment deleted successfully!");
                    refresh();
                },
                err => toast.error("An error occurred...")
            );
    }

    function Payment(props) {

        return (
            <div className="row mx-0 pb-3">
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Type</label>
                        <select className="form-select" defaultValue={props.payment.type} aria-label="Select cc type"
                                disabled={true}>
                            <option value="visa">Visa</option>
                            <option value="mastercard">Master Card</option>
                            <option value="american_express">American Express</option>
                            <option value="discover">Discover</option>
                        </select>
                        <div className="invalid-feedback">Please insert a valid credit card type.</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Number</label>
                        <input type="tel" className="form-control" defaultValue={props.payment.number}
                               disabled={true}/>
                        <div className="invalid-feedback">Please insert a valid credit card number.</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Owner</label>
                        <input type="text" className="form-control" defaultValue={props.payment.owner}
                               disabled={true}/>
                        <div className="invalid-feedback">Please insert a valid credit card owner.</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Expire</label>
                        <input type="month" className="form-control" defaultValue={props.payment.expire}
                               disabled={true}/>
                        <div className="invalid-feedback">Please insert a valid credit card expire date.</div>
                    </div>
                </div>
                <div className="col-12 text-end">
                    <button className="btn btn-outline-danger" onClick={e => onDelete(props.payment.id)}>Delete
                    </button>
                </div>
            </div>
        );

    }

    return (
        <>
            {payments.map(p => <Payment key={p.id} payment={p}/>)}
            <div className="row mx-0">
                <div className="col-12">
                    <hr className="mt-0"/>
                    <button className="btn btn-outline-secondary w-100" data-bs-toggle="collapse"
                            data-bs-target="#payment-add" aria-expanded="false" aria-controls="payment-add">Add
                        payment method
                    </button>
                </div>
                <div className="col-12 px-0">
                    <AddPayment/>
                </div>
            </div>
        </>
    );

}

export default SettingsPayments;
