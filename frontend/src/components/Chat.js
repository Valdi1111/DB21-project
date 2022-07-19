import {useEffect, useState} from "react";
import axios from "axios";
import {api_buyer_url, api_seller_url, avatars_url} from "../services/ApiUrls";
import ChatTemplate from "./ChatTemplate";

function Chat(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (props.auth.user.type === "buyer") {
            axios
                .get(
                    `${api_buyer_url}chat/sellers`,
                    {headers: {"x-access-token": props.auth.token}}
                )
                .then(res => setUsers(res.data));
        }
        if (props.auth.user.type === "seller") {
            axios
                .get(
                    `${api_seller_url}chat/buyers`,
                    {headers: {"x-access-token": props.auth.token}}
                )
                .then(res => setUsers(res.data));
        }
    }, []);

    return (
        <ChatTemplate auth={props.auth} users={users} />
    );

}

export default Chat;
