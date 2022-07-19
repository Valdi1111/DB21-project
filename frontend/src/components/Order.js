import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams} from "react-router-dom";
import "../css/order.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {api_buyer_url} from "../services/ApiUrls";
import {formatCity, formatCreditCardType, formatDate, formatDateTime, formatStreet} from "../services/Utils";

function OrderProduct(props) {
    const navigate = useNavigate();

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
                        <span className="text-muted small">{props.product.price.toFixed(2)} €</span>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="lead fw-normal">Amount</span>
                        <span className="text-muted small">{props.product.amount}</span>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="lead fw-normal">Total</span>
                        <span className="text-muted small">{props.product.total.toFixed(2)} €</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Order(props) {
    const {id} = useParams();

    const [order, setOrder] = useState({});
    const [products, setProducts] = useState([]);
    const [states, setStates] = useState([]);

    useEffect(() => {
        axios
            .get(
                `${api_buyer_url}orders/${id}`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setOrder(res.data));
        axios
            .get(
                `${api_buyer_url}orders/${id}/products`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setProducts(res.data));
        axios
            .get(
                `${api_buyer_url}orders/${id}/states`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setStates(res.data));
    }, []);

    function OrderDetails() {
        if (!Object.keys(order).length || !states.length) {
            return <></>;
        }

        return (
            <div className="card card-stepper">
                <div className="card-body p-4">
                    <div className="d-flex flex-column">
                        <span className="lead fw-normal">Order details #{order.id}</span>
                        <span className="text-muted small">{formatDateTime(states[0].date)}</span>
                    </div>
                    <hr className="my-4"/>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">
                            <span className="lead fw-normal">Shipment</span>
                            <span className="text-muted small">
                                {formatStreet(order.shipment_street,
                                    order.shipment_civic_number)}
                            </span>
                            <span className="text-muted small">
                                {formatCity(order.shipment_city,
                                    order.shipment_district,
                                    order.shipment_postal_code)}
                            </span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="lead fw-normal">Payment</span>
                            <span className="text-muted small">{formatCreditCardType(order.payment_type)}</span>
                            <span className="text-muted small">{order.payment_data}</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="lead fw-normal">Total</span>
                            <span className="text-muted small">{order.total.toFixed(2)} €</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function OrderStates() {
        if (!Object.keys(states).length) {
            return <></>;
        }

        function isState(state) {
            return states.find(s => s.state === state);
        }

        function getDate(state) {
            const st = states.find(s => s.state === state);
            if (!st) {
                return "---";
            }
            return formatDate(st.date);
        }

        return (
            <div className="card card-stepper">
                <div className="card-body p-4">
                    <div className="d-flex flex-column">
                        <span className="lead fw-normal">Your order has been delivered</span>
                        <span className="text-muted small">by DHFL on 21 Jan, 2020</span>
                    </div>
                    <hr className="my-4"/>
                    <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                        <span className={"dot" + (isState("created") ? " dot-active" : "")}/>
                        <hr className="flex-fill track-line"/>
                        <span className={"dot" + (isState("accepted") ? " dot-active" : "")}/>
                        <hr className="flex-fill track-line"/>
                        <span className={"dot" + (isState("shipped") ? " dot-active" : "")}/>
                        <hr className="flex-fill track-line"/>
                        {
                            isState("received")
                                ?
                                <span className="d-flex justify-content-center align-items-center big-dot dot">
                                    <FontAwesomeIcon icon={faCheck} className={"text-white"}/>
                                </span>
                                :
                                <span className="dot"/>
                        }
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <div className="d-flex flex-column align-items-start">
                            <span>Order placed</span>
                            <span>{getDate("created")}</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <span>Order shipped</span>
                            <span>{getDate("accepted")}</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <span>Out for delivery</span>
                            <span>{getDate("shipped")}</span>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <span>Arrived</span>
                            <span>{getDate("received")}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="flex-grow-1 py-3 row mx-0">
            <div className="col-12">
                <OrderDetails/>
            </div>
            <div className="col-12 pt-3">
                <OrderStates/>
            </div>
            {products.map(p =>
                <div key={p.id} className="col-6 pt-3">
                    <OrderProduct product={p}/>
                </div>
            )}
        </main>
    );

}

export default Order;
