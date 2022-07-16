import {useEffect, useState} from "react";
import axios from "axios";
import {api_buyer_url} from "../services/ApiUrls";
import {useNavigate} from "react-router-dom";
import {formatDateTime} from "../services/Utils";

function Order(props) {
    const navigate = useNavigate();

    return (
        <div className="card card-stepper">
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                        <span className="lead fw-normal">Order #{props.order.id}</span>
                        <span className="text-muted small">{formatDateTime(props.order.date)}</span>
                    </div>
                    <div>
                        <button className="btn btn-outline-primary" type="button"
                                onClick={e => navigate("/order/" + props.order.id)}>See details</button>
                    </div>
                </div>
                <hr className="my-4"/>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column">
                        <span className="lead fw-normal">Shipment</span>
                        <span className="text-muted small">
                                {props.order.shipment_street + ", "
                                + props.order.shipment_civic_number}
                            </span>
                        <span className="text-muted small">
                                {props.order.shipment_city + " "
                                + props.order.shipment_district + ", "
                                + props.order.shipment_postal_code}
                            </span>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="lead fw-normal">Total</span>
                        <span className="text-muted small">{props.order.total.toFixed(2)} €</span>
                    </div>
                </div>
            </div>
        </div>
    );

}

function Orders(props) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get(
                `${api_buyer_url}orders`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setOrders(res.data));
    }, []);

    return (
        <main className="flex-grow-1 py-3 row mx-0">
            {orders.map(o =>
                <div key={o.id} className="col-6 pb-3">
                    <Order order={o}/>
                </div>
            )}
        </main>
    );

}

export default Orders;
