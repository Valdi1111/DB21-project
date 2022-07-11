import {useEffect, useState} from "react";
import $ from "jquery";
import axios from "axios";
import AuthService from "../../../../services/AuthService";
import {api_buyer_url} from "../../../../services/ApiUrls";
import AddAddress from "./AddAddress";
import Address from "./Address";

function SettingsAddresses() {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        $(".menu").removeClass("active");
        $("#addresses").addClass("active");
    }, []);

    useEffect(() => {
        refreshAddresses();
    }, []);

    function refreshAddresses() {
        axios
            .get(
                `${api_buyer_url}shipments`,
                {headers: AuthService.authHeader()}
            )
            .then(res => setAddresses(res.data));
    }

    return (
        <>
            {addresses.map(a => <Address key={a.id} address={a} refresh={refreshAddresses}/>)}
            <div className="row mx-0">
                <div className="col-12">
                    <hr/>
                    <button className="btn btn-outline-secondary w-100" data-bs-toggle="collapse"
                            data-bs-target="#shipment-add" aria-expanded="false" aria-controls="shipment-add">Add
                        shipment address
                    </button>
                </div>
                <div className="col-12 px-0">
                    <AddAddress refresh={refreshAddresses}/>
                </div>
            </div>
        </>
    );

}

export default SettingsAddresses;
