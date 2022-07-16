import {useEffect, useRef, useState} from "react";
import $ from "jquery";
import axios from "axios";
import {api_buyer_url} from "../../../services/ApiUrls";
import {toast} from "wc-toast";

function SettingsAddresses(props) {
    const [addresses, setAddresses] = useState([]);
    const name = useRef();
    const street = useRef();
    const civicNumber = useRef();
    const postalCode = useRef();
    const city = useRef();
    const district = useRef();

    useEffect(() => {
        $(".menu").removeClass("active");
        $("#addresses").addClass("active");
        refresh();
    }, []);

    function refresh() {
        axios
            .get(
                `${api_buyer_url}shipments`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(res => setAddresses(res.data));
    }

    function onAdd(e) {
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            const data = {
                name: name.current.value,
                street: street.current.value,
                civic_number: civicNumber.current.value,
                postal_code: postalCode.current.value,
                city: city.current.value,
                district: district.current.value
            };
            axios
                .post(
                    `${api_buyer_url}shipments`,
                    data,
                    {headers: {"x-access-token": props.auth.token}}
                )
                .then(
                    res => {
                        toast.success("Address address added successfully!");
                        document.getElementById("shipment-add").classList.remove("show");
                        name.current.value = "";
                        street.current.value = "";
                        civicNumber.current.value = "";
                        postalCode.current.value = "";
                        city.current.value = "";
                        district.current.value = "";
                        refresh();
                    },
                    err => toast.error("An error occurred...")
                );
        } else {
            e.stopPropagation();
        }
        e.target.classList.add("was-validated");
    }

    function AddAddress() {
        return (
            <form id="shipment-add" className="row mx-0 mt-3 collapse" onSubmit={onAdd} noValidate={true}>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Street</label>
                        <input type="text" className="form-control" ref={street} required={true}/>
                        <div className="invalid-feedback">Please insert a valid street.</div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Civic</label>
                        <input type="text" className="form-control" ref={civicNumber} required={true}/>
                        <div className="invalid-feedback">Please insert a valid civic number.</div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Code</label>
                        <input type="text" className="form-control" ref={postalCode} required={true}/>
                        <div className="invalid-feedback">Please insert a valid postal code.</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">City</label>
                        <input type="text" className="form-control" ref={city} required={true}/>
                        <div className="invalid-feedback">Please insert a valid city.</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">District</label>
                        <input type="text" className="form-control" ref={district} required={true}/>
                        <div className="invalid-feedback">Please insert a valid district.</div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Name</label>
                        <input type="text" className="form-control" ref={name} required={true}/>
                        <div className="invalid-feedback">Please insert a valid name.</div>
                    </div>
                </div>
                <div className="col-3">
                    <button type="submit" className="btn btn-outline-success w-100">Submit</button>
                </div>
            </form>
        );

    }

    function onDelete(id) {
        axios
            .delete(
                `${api_buyer_url}shipments/${id}`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(
                res => {
                    toast.success("AddAddress deleted successfully!");
                    refresh();
                },
                err => toast.error("An error occurred...")
            );
    }

    function Address(props) {

        return (
            <div className="row mx-0">
                <h4 className="col-12 mb-3">{props.address.name}</h4>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Street</label>
                        <input type="text" className="form-control" defaultValue={props.address.street}
                               disabled={true}/>
                        <div className="invalid-feedback">Please insert a valid street.</div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Civic</label>
                        <input type="text" className="form-control" defaultValue={props.address.civic_number}
                               disabled={true}/>
                        <div className="invalid-feedback">Please insert a valid civic number.</div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Code</label>
                        <input type="text" className="form-control" defaultValue={props.address.postal_code}
                               disabled={true}/>
                        <div className="invalid-feedback">Please insert a valid postal code.</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">City</label>
                        <input type="text" className="form-control" defaultValue={props.address.city} disabled={true}/>
                        <div className="invalid-feedback">Please insert a valid city.</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">District</label>
                        <input type="text" className="form-control" defaultValue={props.address.district}
                               disabled={true}/>
                        <div className="invalid-feedback">Please insert a valid district.</div>
                    </div>
                </div>
                <div className="col-12 text-end">
                    <button className="btn btn-outline-danger" onClick={e => onDelete(props.address.id)}>Delete</button>
                </div>
            </div>
        );

    }

    return (
        <>
            {addresses.map(a => <Address key={a.id} address={a}/>)}
            <div className="row mx-0">
                <div className="col-12">
                    <hr/>
                    <button className="btn btn-outline-secondary w-100" data-bs-toggle="collapse"
                            data-bs-target="#shipment-add" aria-expanded="false" aria-controls="shipment-add">Add
                        shipment address
                    </button>
                </div>
                <div className="col-12 px-0">
                    <AddAddress/>
                </div>
            </div>
        </>
    );

}

export default SettingsAddresses;
