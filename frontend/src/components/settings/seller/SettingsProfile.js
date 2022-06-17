import ProfileAvatar from "../profile/ProfileAvatar";
import ProfileAddress from "../profile/ProfileAddress";
import {useEffect, useRef} from "react";
import $ from "jquery";
import axios from "axios";
import {api_seller_url} from "../../../services/ApiUrls";
import AuthService from "../../../services/AuthService";
import {toast} from "wc-toast";

function SettingsProfile() {
    const name = useRef();
    const vat = useRef();

    useEffect(() => {
        $(".menu").removeClass("active");
        $("#profile").addClass("active");
    }, []);

    useEffect(() => {
        axios
            .get(
                `${api_seller_url}profile`,
                {headers: AuthService.authHeader()}
            )
            .then(
                res => {
                    name.current.value = res.data.name;
                    vat.current.value = res.data.vat;
                }
            );
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            axios
                .put(
                    `${api_seller_url}profile`,
                    {
                        name: name.current.value,
                        vat: vat.current.value
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
            <ProfileAvatar/>
            <form className="row mx-0 mt-3" onSubmit={handleSubmit} noValidate={true}>
                <h4 className="mb-3 text-center">Change data</h4>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Name</label>
                        <input type="text" className="form-control" ref={name} required={true}/>
                        <div className="invalid-feedback">Please insert a valid business name.</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="input-group mb-2">
                        <label className="input-group-text">Vat</label>
                        <input type="text" className="form-control" ref={vat} required={true}/>
                        <div className="invalid-feedback">Please insert a valid vat.</div>
                    </div>
                </div>
                <div className="col-12 text-end">
                    <button type="submit" className="btn btn-outline-success">Submit</button>
                </div>
            </form>
            <ProfileAddress/>
        </>
    );

}

export default SettingsProfile;