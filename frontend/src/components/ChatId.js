import {useEffect, useState} from "react";
import axios from "axios";
import {api_buyer_url, api_seller_url, avatars_url} from "../services/ApiUrls";
import ChatTemplate from "./ChatTemplate";
import {useParams} from "react-router-dom";
import {toast} from "wc-toast";

function ChatId(props) {
    const {id} = useParams();

    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

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
        loadMessages();
    }, [id]);

    function loadMessages() {
        if (props.auth.user.type === "buyer") {
            axios
                .get(
                    `${api_buyer_url}chat/${id}`,
                    {headers: {"x-access-token": props.auth.token}}
                )
                .then(res => setMessages(res.data));
        }
        if (props.auth.user.type === "seller") {
            axios
                .get(
                    `${api_seller_url}chat/${id}`,
                    {headers: {"x-access-token": props.auth.token}}
                )
                .then(res => setMessages(res.data));
        }
    }

    function onSend(message) {
        if (props.auth.user.type === "buyer") {
            axios
                .post(
                    `${api_buyer_url}chat`,
                    {seller: id, message},
                    {headers: {"x-access-token": props.auth.token}}
                )
                .then(
                    res => loadMessages(),
                    err => toast.error("An error occurred...")
                );
        }
        if (props.auth.user.type === "seller") {
            axios
                .post(
                    `${api_seller_url}chat`,
                    {buyer: id, message},
                    {headers: {"x-access-token": props.auth.token}}
                )
                .then(
                    res => loadMessages(),
                    err => toast.error("An error occurred...")
                );
        }
    }

    return (
        <ChatTemplate auth={props.auth} users={users} messages={messages} send={onSend}/>
    );

}

export default ChatId;
