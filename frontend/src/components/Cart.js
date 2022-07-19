import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import axios from "axios";
import $ from "jquery";
import {api_buyer_url} from "../services/ApiUrls";
import {useNavigate} from "react-router-dom";
import {formatCreditCard, formatPrice, formatStreet} from "../services/Utils";
import {toast} from "wc-toast";

function CartProduct(props) {
    const navigate = useNavigate();

    function getPrice(p) {
        if (p.discount === 0) {
            return <span className="text-muted small">{formatPrice(props.product.price)}</span>;
        }
        return (
            <>
                <span className="text-muted small"><del>{formatPrice(props.product.price)}</del></span>
                <span className="text-muted small">{formatPrice(props.product.current_price)}</span>
            </>
        );
    }

    function onAmount(input) {
        axios
            .put(
                `${api_buyer_url}cart`,
                {product: props.product.id, amount: input.val()},
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(
                res => {
                    toast.success("Product updated!");
                    props.reload();
                },
                err => toast.error("An error occurred...")
            );
    }

    function changeAmount(e, up) {
        const input = $("#input-amount");
        if (up) {
            input[0].stepUp(1);
        } else {
            input[0].stepDown(1);
        }
        onAmount(input);
    }

    function onDelete(e) {
        axios
            .delete(
                `${api_buyer_url}cart/${props.product.id}`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(
                res => {
                    toast.success("Product removed from cart!");
                    props.reload();
                },
                err => toast.error("An error occurred...")
            );
    }

    return (
        <div className="card">
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                        <span className="lead fw-normal">{props.product.title}</span>
                    </div>
                    <div className="d-flex flex-column">
                        <button className="btn btn-outline-primary" type="button"
                                onClick={e => navigate("/product/" + props.product.id)}>See details
                        </button>
                    </div>
                </div>
                <hr className="my-3"/>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column">
                        <span className="lead fw-normal">Price</span>
                        {getPrice(props.product)}
                    </div>
                    <div className="d-flex flex-column">
                        <span className="lead fw-normal">Amount</span>
                        <div className="input-group input-group-sm">
                            <input id="input-amount" className="form-control" style={{width: "75px"}} type="number"
                                   step={1} min={0} defaultValue={props.product.amount}
                                   onChange={e => onAmount($(e.target))}/>
                            <button className="btn btn-outline-danger" onClick={e => changeAmount(e, false)}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </button>
                            <button className="btn btn-outline-success" onClick={e => changeAmount(e, true)}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>
                            <button className="btn btn-outline-secondary" onClick={onDelete}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="lead fw-normal">Total</span>
                        <span className="text-muted small">{formatPrice(props.product.total)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Cart(props) {
    const [products, setProducts] = useState([]);
    const [shipments, setShipments] = useState([]);
    const [payments, setPayments] = useState([]);
    const [balance, setBalance] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        reload();
        axios
            .get(
                `${api_buyer_url}shipments`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setShipments(res.data));
        axios
            .get(
                `${api_buyer_url}payments`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setPayments(res.data));
        axios
            .get(
                `${api_buyer_url}profile/balance`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setBalance(res.data.balance));
    }, []);

    function reload() {
        axios
            .get(
                `${api_buyer_url}cart`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => {
                setProducts(res.data);
                let t = 0;
                res.data.forEach(d => {
                    t += d.total;
                });
                setTotal(t);
            });
    }

    function checkout(e) {
        if (!products.length) {
            toast.error("Add at least a product first!");
            return;
        }
        const s = $("#shipment").val();
        const p = $("#payment").val();
        if (!s || s === "auto") {
            toast.error("Select a shipment address!");
            return;
        }
        if (!p || p === "auto") {
            toast.error("Select a payment method!");
            return;
        }
        axios
            .post(
                `${api_buyer_url}checkout`,
                {payment: p, shipment: s},
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(
                res => {
                    toast.success("Order placed successfully!");
                    reload();
                },
                err => toast.error("An error occurred...")
            );
    }

    function bal() {
        return balance > total ? total : balance;
    }

    function CartCheckout() {

        return (
            <div className="card">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                            <span className="lead fw-normal">Cart</span>
                        </div>
                        <div className="d-flex flex-column">
                            <button className="btn btn-outline-primary" type="button" onClick={checkout}>Checkout
                            </button>
                        </div>
                    </div>
                    <hr className="my-3"/>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">
                            <select id="shipment" className="form-select" defaultValue="auto"
                                    aria-label="shipment selection">
                                <option value="auto">Select shipment address</option>
                                {shipments.map(s =>
                                    <option key={s.id} value={s.id}>{formatStreet(s.street, s.civic_number)}</option>
                                )}
                            </select>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="input-group">
                                <select id="payment" className="form-select" defaultValue="auto"
                                        aria-label="shipment selection">
                                    <option value="auto">Select payment method</option>
                                    {payments.map(p =>
                                        <option key={p.id} value={p.id}>{formatCreditCard(p.type, p.number)}</option>
                                    )}
                                </select>
                                <input id="cvc" type="tel" className="form-select" maxLength={3} placeholder="cvc"/>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row">
                                <div className="d-flex flex-column me-4">
                                    <span className="text-muted small">subtotal</span>
                                    <span className="text-muted small">balance</span>
                                </div>
                                <div className="d-flex flex-column text-end">
                                    <span className="text-muted small">{formatPrice(total)}</span>
                                    <span className="text-muted small">-{formatPrice(bal())}</span>
                                    <hr className="my-1"/>
                                    <span className="text-muted small">{formatPrice(total - bal())}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    return (
        <main className="flex-grow-1 py-3 row mx-0">
            <div className="col-12 pb-3">
                <CartCheckout auth={props.auth}/>
            </div>
            {products.map(p =>
                <div key={p.id} className="col-6 pb-3">
                    <CartProduct auth={props.auth} product={p} reload={reload}/>
                </div>
            )}
        </main>
    );

}

export default Cart;
