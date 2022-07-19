import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegram} from "@fortawesome/free-brands-svg-icons";
import {avatars_url} from "../services/ApiUrls";
import {formatDateTime} from "../services/Utils";
import {useNavigate} from "react-router-dom";
import $ from "jquery";
import {useEffect} from "react";

function ChatPerson(props) {
    const navigate = useNavigate();

    function goTo(e) {
        navigate("/chat/" + props.user.id);
    }

    return (
        <li className="d-flex flex-row mb-2 align-items-center" onClick={goTo}>
            <img className="rounded-circle" src={avatars_url + props.user.avatar} width={56} height={56} alt="avatar"/>
            <div className="ms-2">
                <h6 className="mb-1">{props.user.name}</h6>
                <span className="text-muted">{props.user.email}</span>
            </div>
        </li>
    );

}

function ChatMessage(props) {
    let side = "";
    if (props.buyer) {
        side = props.message.sent ? "justify-content-end" : "justify-content-start";
    } else {
        side = props.message.sent ? "justify-content-start" : "justify-content-end";
    }

    return (
        <div className={"d-flex flex-row " + side}>
            <div className="d-inline-block background px-3 py-2 mb-2 rounded-2" style={{maxWidth: "70%"}}>
                <p className="mb-1">{props.message.text}</p>
                <span className="text-muted" style={{fontSize: "85%"}}>{formatDateTime(props.message.created)}</span>
            </div>
        </div>
    );

}

function ChatTemplate(props) {

    useEffect(() => {
        const d = $('#messages');
        d.scrollTop(d.prop("scrollHeight"));
    });

    function users() {
        return props.users.map(u => <ChatPerson key={u.id} user={u}/>);
    }

    function onSend(e) {
        const input = $("#text");
        if (!input.val()) {
            return;
        }
        props.send(input.val());
        input.val("");
    }

    function messages() {
        if (props.messages === undefined) {
            return (
                <div className="d-flex align-items-center justify-content-center w-100 h-100">
                    <p>Select a user from the left column</p>
                </div>
            );
        }
        return (
            <>
                <div className="flex-grow-1">
                    <div className="position-relative h-100 w-100">
                        <div id="messages" className="position-absolute overflow-auto h-100 w-100">
                            {props.messages.map(m => <ChatMessage key={m.id} message={m}
                                                                  buyer={props.auth.user.type === "buyer"}/>)}
                        </div>
                    </div>
                </div>
                <div className="input-group pt-3">
                    <input id="text" className="form-control" type="text"/>
                    <button className="btn btn-outline-primary" type="button" onClick={onSend}>
                        <FontAwesomeIcon icon={faTelegram}/>
                        <span className="ms-2">Send</span>
                    </button>
                </div>
            </>
        );
    }

    return (
        <main className="flex-grow-1 py-3 row mx-0">
            <aside className="col-4 border-end">
                <div className="position-relative h-100 w-100">
                    <ul className="position-absolute overflow-auto h-100 w-100 list-unstyled">
                        {users()}
                    </ul>
                </div>
            </aside>
            <div className="col-8">
                <div className="d-flex flex-column h-100 w-100">
                    {messages()}
                </div>
            </div>
        </main>
    );

}

export default ChatTemplate;
