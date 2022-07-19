import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {api_admin_url} from "../services/ApiUrls";
import {formatDateTime} from "../services/Utils";
import {toast} from "wc-toast";

function Order(props) {
    const [state, setState] = useState(props.order.state);
    const stateInput = useRef();

    function update() {
        const s = stateInput.current.value;
        axios
            .put(
                `${api_admin_url}orders/${props.order.id}/state`,
                {state: s},
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(
                res => {
                    toast.success("Order state updated successfully!");
                    setState(s);
                },
                err => toast.error("An error occurred...")
            );
    }

    function updateStates() {
        if (state === "created") {
            return (
                <option value="accepted">Accepted</option>
            );
        }
        if (state === "accepted") {
            return (
                <option value="shipped">Shipped</option>
            );
        }
        if (state === "shipped") {
            return (
                <option value="received">Received</option>
            );
        }
    }

    return (
        <div className="card card-stepper">
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                        <span className="lead fw-normal">Order #{props.order.id}</span>
                        <span className="text-muted small">{formatDateTime(props.order.date)}</span>
                    </div>
                    <div className="d-flex flex-column text-end">
                        <span className="text-muted fw-normal">{props.order.name + " " + props.order.surname}</span>
                        <span className="text-muted small">{props.order.email}</span>
                    </div>
                </div>
                <hr className="my-4"/>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column">
                        <span className="lead fw-normal">Current state</span>
                        <span className="text-muted small">{state}</span>
                    </div>
                    <div className="d-flex flex-column">
                        {
                            state === "received"
                                ?
                                <span className="lead fw-normal">Already received</span>
                                :
                                <div className="input-group">
                                    <select className="form-select" ref={stateInput} aria-label="Select state">
                                        {updateStates()}
                                    </select>
                                    <button className="btn btn-outline-secondary" type="button"
                                            onClick={update}>Update
                                    </button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

function Dashboard(props) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get(
                `${api_admin_url}orders`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setOrders(res.data));
    }, []);

    return (
        <main className="flex-grow-1 py-3 row mx-0">
            {orders.map(o =>
                <div key={o.id} className="col-6 pb-3">
                    <Order auth={props.auth} order={o}/>
                </div>
            )}
        </main>
    );

}

export default Dashboard;
