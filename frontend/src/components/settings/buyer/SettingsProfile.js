import {useEffect, useRef} from "react";
import axios from "axios";
import {api_buyer_url} from "../../../services/ApiUrls";
import AuthService from "../../../services/AuthService";
import {toast} from "wc-toast";
import ProfileAvatar from "../profile/ProfileAvatar";
import ProfileAddress from "../profile/ProfileAddress";
import $ from "jquery";

function SettingsProfile() {
    const name = useRef();
    const surname = useRef();
    const fiscalCode = useRef();
    const gender = useRef();

    useEffect(() => {
        $(".menu").removeClass("active");
        $("#profile").addClass("active");
    }, []);

    useEffect(() => {
        axios
            .get(
                `${api_buyer_url}profile`,
                {headers: AuthService.authHeader()}
            )
            .then(
                res => {
                    name.current.value = res.data.name;
                    surname.current.value = res.data.surname;
                    fiscalCode.current.value = res.data.fiscal_code;
                    gender.current.value = res.data.gender;
                }
            );
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            axios
                .put(
                    `${api_buyer_url}profile`,
                    {
                        name: name.current.value,
                        surname: surname.current.value,
                        fiscal_code: fiscalCode.current.value,
                        gender: gender.current.value
                    },
                    {headers: AuthService.authHeader()}
                )
                .then(
                    res => {
                        toast.success("Data changed successfully!");
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
        <>
            <ProfileAvatar />
            <form className="row mx-0 mt-3" onSubmit={handleSubmit} noValidate={true}>
                <h4 className="mb-3 text-center">Change data</h4>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Name</label>
                        <input type="text" className="form-control" ref={name} required={true}/>
                        <div className="invalid-feedback">Please insert a valid name.</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Surname</label>
                        <input type="text" className="form-control" ref={surname} required={true}/>
                        <div className="invalid-feedback">Please insert a valid surname.</div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Fiscal code</label>
                        <input type="text" className="form-control" ref={fiscalCode} required={true}/>
                        <div className="invalid-feedback">Please insert a valid fiscal code.</div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Gender</label>
                        <select className="form-select" aria-label="Select gender" ref={gender} required={true}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <div className="invalid-feedback">You must select a gender.</div>
                    </div>
                </div>
                <div className="col-12 text-end">
                    <button type="submit" className="btn btn-outline-success">Submit</button>
                </div>
            </form>
            <ProfileAddress />
        </>
    );

}

export default SettingsProfile;