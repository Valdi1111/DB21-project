import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import axios from "axios";
import $ from "jquery";
import {api_buyer_url} from "../services/ApiUrls";
import {useNavigate} from "react-router-dom";
import {formatPrice} from "../services/Utils";
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
    const [total, setTotal] = useState(0);

    useEffect(() => {
        reload();
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

    function CartCheckout() {

        return (
            <div className="card">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                            <span className="lead fw-normal">Cart</span>
                        </div>
                        <div className="d-flex flex-column">
                            <button className="btn btn-outline-primary" type="button">Checkout</button>
                        </div>
                    </div>
                    <hr className="my-3"/>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">
                            <span className="lead fw-normal">Price</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="lead fw-normal">Amount</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="lead fw-normal">Total</span>
                            <span className="text-muted small">{formatPrice(total)}</span>
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
