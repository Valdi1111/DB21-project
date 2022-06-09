import {useEffect} from "react";
import $ from "jquery";

function SettingsPayments() {

    useEffect(() => {
        $(".menu").removeClass("active");
        $("#payments").addClass("active");
    }, []);

    return (
        <p>pay
        </p>
    );

}

export default SettingsPayments;