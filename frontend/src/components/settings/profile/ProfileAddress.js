import axios from "axios";
import {api_user_url} from "../../../services/ApiUrls";
import {toast} from "wc-toast";
import {useEffect, useRef} from "react";

function ProfileAddress(props) {
    const street = useRef();
    const civicNumber = useRef();
    const postalCode = useRef();
    const city = useRef();
    const district = useRef();

    useEffect(() => {
        axios
            .get(
                `${api_user_url}data/address`,
                {headers: {"x-access-token": props.auth.token}}
            )
            .then(
                res => {
                    street.current.value = res.data.street;
                    civicNumber.current.value = res.data.civic_number;
                    postalCode.current.value = res.data.postal_code;
                    city.current.value = res.data.city;
                    district.current.value = res.data.district;
                }
            );
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            const data = {
                street: street.current.value,
                civic_number: civicNumber.current.value,
                postal_code: postalCode.current.value,
                city: city.current.value,
                district: district.current.value
            };
            axios
                .put(
                    `${api_user_url}data/address`,
                    data,
                    {headers: {"x-access-token": props.auth.token}}
                )
                .then(
                    res => {
                        toast.success("Address updated successfully!");
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
            <h4 className="mb-3 text-center">Change address</h4>
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
            <div className="col-12 text-end">
                <button type="submit" className="btn btn-outline-success">Submit</button>
            </div>
        </form>
    );

}

export default ProfileAddress;
