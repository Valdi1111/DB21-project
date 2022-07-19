import axios from "axios";
import {api_auth_url} from "../services/ApiUrls";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {toast} from "wc-toast";

function Register(props) {
    const [type, setType] = useState("buyer"); // buyer seller admin
    const navigate = useNavigate();

    // user
    const username = useRef();
    const email = useRef();
    const password = useRef();
    // buyer
    const bName = useRef();
    const bSurname = useRef();
    const bFiscalCode = useRef();
    const bGender = useRef();
    // seller
    const sName = useRef();
    const sVat = useRef();
    // address
    const aStreet = useRef();
    const aCivicNumber = useRef();
    const aPostalCode = useRef();
    const aCity = useRef();
    const aDistrict = useRef();

    function onRegister(e) {
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            const data = {
                type: type,
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                street: aStreet.current.value,
                civic_number: aCivicNumber.current.value,
                postal_code: aPostalCode.current.value,
                city: aCity.current.value,
                district: aDistrict.current.value
            };
            if (type === "buyer") {
                data["name"] = bName.current.value;
                data["surname"] = bSurname.current.value;
                data["fiscal_code"] = bFiscalCode.current.value;
                data["gender"] = bGender.current.value;
            }
            if (type === "seller") {
                data["name"] = sName.current.value;
                data["vat"] = sVat.current.value;
            }
            axios
                .post(
                    `${api_auth_url}register`,
                    data
                )
                .then(
                    res => {
                        toast.success("User registered successfully!");
                        navigate("/login");
                    },
                    err => {
                        if(err.response.status === 409) {
                            toast.error(err.response.data.message);
                            return;
                        }
                        toast.error("An error occurred...");
                    }
                );
        } else {
            e.stopPropagation();
        }
        e.target.classList.add("was-validated");
    }

    function user() {
        return (
            <>
                <div className="col-12">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Username</label>
                        <input type="text" className="form-control" ref={username} required={true}/>
                        <div className="invalid-feedback">Please insert a valid username.</div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Email</label>
                        <input type="email" className="form-control" ref={email} required={true}/>
                        <div className="invalid-feedback">Please insert a valid email.</div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group mb-3">
                        <label className="input-group-text">Password</label>
                        <input type="password" className="form-control" ref={password} required={true}/>
                        <div className="invalid-feedback">Please insert a valid password.</div>
                    </div>
                </div>
                <div className="col-12 d-flex flex-row justify-content-around mb-3">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" name="user-type" type="radio" value="buyer"
                               defaultChecked={true} onChange={e => setType(e.target.value)}/>
                        <label className="form-check-label">Buyer</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" name="user-type" type="radio" value="seller"
                               onChange={e => setType(e.target.value)}/>
                        <label className="form-check-label">Seller</label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-outline-success w-100">Register</button>
                </div>
            </>
        );
    }

    function address() {
        return (
            <>
                <div className="col-8">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Street</label>
                        <input type="text" className="form-control" ref={aStreet} required={true}/>
                        <div className="invalid-feedback">Please insert a valid street.</div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Civic</label>
                        <input type="text" className="form-control" ref={aCivicNumber} required={true}/>
                        <div className="invalid-feedback">Please insert a valid civic number.</div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="input-group mb-2">
                        <label className="input-group-text">City</label>
                        <input type="text" className="form-control" ref={aCity} required={true}/>
                        <div className="invalid-feedback">Please insert a valid city.</div>
                    </div>
                </div>
                <div className="col-5">
                    <div className="input-group mb-2">
                        <label className="input-group-text">District</label>
                        <input type="text" className="form-control" ref={aDistrict} required={true}/>
                        <div className="invalid-feedback">Please insert a valid district.</div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Postal code</label>
                        <input type="text" className="form-control" ref={aPostalCode} required={true}/>
                        <div className="invalid-feedback">Please insert a valid postal code.</div>
                    </div>
                </div>
            </>
        );
    }

    function buyer() {
        return (
            <>
                <div className="col-12">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Name</label>
                        <input type="text" className="form-control" ref={bName} required={true}/>
                        <div className="invalid-feedback">Please insert a valid name.</div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Surname</label>
                        <input type="text" className="form-control" ref={bSurname} required={true}/>
                        <div className="invalid-feedback">Please insert a valid surname.</div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Fiscal code</label>
                        <input type="text" className="form-control" ref={bFiscalCode} required={true}/>
                        <div className="invalid-feedback">Please insert a valid fiscal code.</div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Gender</label>
                        <select className="form-control" ref={bGender} required={true}
                                aria-label="Select gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <div className="invalid-feedback">Please insert a valid gender.</div>
                    </div>
                </div>
            </>
        );
    }

    function seller() {
        return (
            <>
                <div className="col-12">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Business name</label>
                        <input type="text" className="form-control" ref={sName} required={true}/>
                        <div className="invalid-feedback">Please insert a valid business name.</div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Vat</label>
                        <input type="text" className="form-control" ref={sVat} required={true}/>
                        <div className="invalid-feedback">Please insert a valid vat.</div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <main className="flex-grow-1 py-3">
            <form className="row mx-0" onSubmit={onRegister} noValidate={true}>
                <h4 className="col-12 text-center mb-3">Register account</h4>
                <div className="col-6">
                    <div className="row">
                        {user()}
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        {type === "buyer" ? buyer() : <></>}
                        {type === "seller" ? seller() : <></>}
                        <h5 className="col-12 text-center py-2">Address</h5>
                        {address()}
                    </div>
                </div>
            </form>
        </main>
    );

}

export default Register;
