import {useEffect, useState} from "react";
import $ from "jquery";
import {Link, useParams} from "react-router-dom";
import SettingsProfile from "./SettingsProfile";
import SettingsAddresses from "./SettingsAddresses";
import SettingsPayments from "./SettingsPayments";

function Settings(props) {
    const {id} = useParams();
    const data = [
        {id: "profile", name: "Profile"},
        {id: "notifications", name: "Notifications"},
        {id: "payments", name: "Payments"},
        {id: "addresses", name: "Addresses"}
    ];

    useEffect(() => {
        $(".menu").removeClass("active");
        $("#" + id).addClass("active");
    }, [id]);

    return (
        <main className="mx-0 py-3 row flex-grow-1">
            <aside className="px-3 col-3 border-end">
                <nav className="flex-column nav nav-pills align-items-stretch">
                    {data.map(d => <Link key={d.id} id={d.id} className="nav-link mb-2 menu" style={{cursor: "pointer"}}
                                         to={"/settings/" + d.id}>{d.name}</Link>)}
                </nav>
            </aside>
            <div className="px-3 col-9">
                {id === "profile" ? <SettingsProfile auth={props.auth}/> : <></>}
                {id === "payments" ? <SettingsPayments auth={props.auth}/> : <></>}
                {id === "addresses" ? <SettingsAddresses auth={props.auth}/> : <></>}
            </div>
        </main>
    );

}

export default Settings;