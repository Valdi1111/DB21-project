import {useEffect, useState} from "react";
import $ from "jquery";
import {useParams} from "react-router-dom";
import axios from "axios";
import {api_url} from "../../../../services/ApiUrls";

function SettingsProduct() {
    const {id} = useParams();

    const [faq, setFaq] = useState([]);

    // get faqs
    useEffect(() => {
        axios
            .get(
                `${api_url}products/${id}/faqs`
            )
            .then(
                res => setFaq(res.data)
            );
    }, [id]);

    useEffect(() => {
        $(".menu").removeClass("active");
        $("#products").addClass("active");
    }, []);

    return (
        <>
            <div>

            </div>
        </>
    );

}

export default SettingsProduct;