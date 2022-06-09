import axios from "axios";
import {useRef} from "react";
import {toast} from "wc-toast";
import AuthService from "../../../services/AuthService";
import {api_buyer_url} from "../../../services/ApiUrls";

function AddAddress(props) {
    const name = useRef();
    const street = useRef();
    const civicNumber = useRef();
    const postalCode = useRef();
    const city = useRef();
    const district = useRef();

    function handleSubmit(e) {
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
                    {headers: AuthService.authHeader()}
                )
                .then(
                    res => {
                        toast.success("Address address added successfully!");
                        data.id = res.data.id;
                        props.add(data);
                    },
                    err => {
                        toast.error("An error occurred...");
                    }
                );
        } else {
            e.stopPropagation();
        }
        e.target.classList.add("was-validated");
    }

    return (
        <form className="row mx-0 mt-3" onSubmit={handleSubmit} noValidate={true}>
            <div className="col-6">
                <div className="input-group mb-2">
                    <label className="input-group-text" htmlFor="street_data">Street</label>
                    <input type="text" id="street_data" className="form-control" ref={street} required/>
                    <div className="invalid-feedback">Please insert a valid street.</div>
                </div>
            </div>
            <div className="col-3">
                <div className="input-group mb-2">
                    <label className="input-group-text" htmlFor="civic_data">Civic</label>
                    <input type="text" id="civic_data" className="form-control" ref={civicNumber} required/>
                    <div className="invalid-feedback">Please insert a valid civic number.</div>
                </div>
            </div>
            <div className="col-3">
                <div className="input-group mb-2">
                    <label className="input-group-text" htmlFor="code_data">Code</label>
                    <input type="text" id="code_data" className="form-control" ref={postalCode} required/>
                    <div className="invalid-feedback">Please insert a valid postal code.</div>
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <label className="input-group-text" htmlFor="city_data">City</label>
                    <input type="text" id="city_data" className="form-control" ref={city} required/>
                    <div className="invalid-feedback">Please insert a valid city.</div>
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <label className="input-group-text" htmlFor="district_data">District</label>
                    <input type="text" id="district_data" className="form-control" ref={district} required/>
                    <div className="invalid-feedback">Please insert a valid district.</div>
                </div>
            </div>
            <div className="col-9">
                <div className="input-group mb-2">
                    <label className="input-group-text" htmlFor="name_data">Name</label>
                    <input type="text" id="name_data" className="form-control" ref={name} required/>
                    <div className="invalid-feedback">Please insert a valid name.</div>
                </div>
            </div>
            <div className="col-3">
                <button type="submit" className="btn btn-outline-success w-100">Submit</button>
            </div>
        </form>
    );

}

export default AddAddress;