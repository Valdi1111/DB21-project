import {useEffect, useRef, useState} from "react";
import $ from "jquery";
import axios from "axios";
import {api_buyer_url} from "../../../services/ApiUrls";
import {toast} from "wc-toast";

function SettingsBalance(props) {
    const balance = useRef();
    const coupon = useRef();

    useEffect(() => {
        $(".menu").removeClass("active");
        $("#balance").addClass("active");
        load();
    }, []);

    function load() {
        axios
            .get(
                `${api_buyer_url}profile/balance`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => balance.current.value = res.data.balance.toFixed(2));
    }

    function redeem(e) {
        const code = coupon.current.value;
        axios
            .post(
                `${api_buyer_url}profile/redeem`,
                {code},
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(
                res => {
                    toast.success("Coupon redeemed successfully!");
                    load()
                },
                err => {
                    if(err.response.status === 409) {
                        toast.error(err.response.data.message);
                        return;
                    }
                    toast.error("An error occurred...");
                }
            );
    }

    return (
        <main className="row mx-0">
            <h4 className="mb-3 text-center">Balance</h4>
            <div className="col-12">
                <div className="input-group mb-2">
                    <label className="input-group-text">Current balance</label>
                    <input type="number" className="form-control text-end" ref={balance} min={0} step={0.01}
                           disabled={true}/>
                    <label className="input-group-text">€</label>
                </div>
            </div>
            <h4 className="mb-3 text-center">Coupon</h4>
            <div className="col-12">
                <div className="input-group mb-2">
                    <label className="input-group-text">Coupon code</label>
                    <input type="text" className="form-control text-end" ref={coupon}/>
                    <button type="button" className="btn btn-outline-success" onClick={redeem}>Redeem</button>
                </div>
            </div>
        </main>
    );

}

export default SettingsBalance;
