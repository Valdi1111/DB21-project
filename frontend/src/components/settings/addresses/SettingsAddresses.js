import {useEffect, useState} from "react";
import $ from "jquery";
import axios from "axios";
import AuthService from "../../../services/AuthService";
import {api_buyer_url} from "../../../services/ApiUrls";
import AddAddress from "./AddAddress";
import Address from "./Address";

function SettingsAddresses() {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        $(".menu").removeClass("active");
        $("#addresses").addClass("active");
    }, []);

    useEffect(() => {
        axios
            .get(
                `${api_buyer_url}shipments`,
                {headers: AuthService.authHeader()}
            )
            .then(
                res => {
                    setAddresses(res.data);
                }
            );
    }, []);

    function addAddress(data) {
        setAddresses([...addresses, data]);
    }

    function deleteAddress(id) {
        setAddresses(addresses.filter(e => e.id !== id));
    }

    return (
        <>
            {addresses.map(a => <Address key={a.id} address={a} delete={deleteAddress}/>)}
            <div className="row mx-0">
                <div className="col-12">
                    <hr/>
                    <button className="btn btn-outline-secondary w-100" data-bs-toggle="collapse"
                            data-bs-target="#shipment-add" aria-expanded="false" aria-controls="shipment-add">Add
                        shipment address
                    </button>
                </div>
                <div id="shipment-add" className="col-12 px-0 collapse">
                    <AddAddress add={addAddress}/>
                </div>
            </div>
        </>
    );

}

export default SettingsAddresses;