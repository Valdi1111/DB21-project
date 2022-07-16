import {useEffect} from "react";
import $ from "jquery";

function SettingsPayments(props) {

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
