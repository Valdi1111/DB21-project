import $ from "jquery";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faTelegram, faTelegramPlane} from "@fortawesome/free-brands-svg-icons";

function ChatPerson(props) {
    const link = "https://bootdey.com/img/Content/avatar/avatar1.png";

    return (
        <li className="d-flex flex-row mb-2 align-items-center">
            <img className="rounded-circle" src={link} width={56} height={56} alt="avatar"/>
            <div className="ms-2">
                <h6 className="mb-1">Vincent Porter</h6>
                <span className="text-muted">Left 7 mins ago</span>
            </div>
        </li>
    );

}

function ChatMessage(props) {
    const link = "https://bootdey.com/img/Content/avatar/avatar1.png";
    const side = props.mine ? "justify-content-end" : "justify-content-start";

    return (
        <div className={"d-flex flex-row " + side}>
            <div className="d-inline-block background px-3 py-2 mb-2 rounded-2" style={{maxWidth: "70%"}}>
                <p className="mb-1">Lore ipsum Lore ipsum Lore ipsum Lore ipsum Lore ipsum Lore ipsum Lore ipsum Lore
                    ipsum Lore ipsum Lore ipsum Lore ipsum Lore ipsum Lore ipsum Lore ipsum Lore ipsum Lore ipsum Lore
                    ipsum Lore ipsum</p>
                <span className="text-muted" style={{fontSize: "85%"}}>data di sos sas</span>
            </div>
        </div>
    );

}

function Chat(props) {

    return (
        <main className="flex-grow-1 py-3 row mx-0">
            <aside className="col-4 border-end">
                <div className="position-relative h-100 w-100">
                    <ul className="position-absolute overflow-auto h-100 w-100 list-unstyled">
                        <ChatPerson/>
                        <ChatPerson/>
                        <ChatPerson/>
                        <ChatPerson/>
                        <ChatPerson/>
                        <ChatPerson/>
                        <ChatPerson/>
                        <ChatPerson/>
                        <ChatPerson/>
                        <ChatPerson/>
                        <ChatPerson/>
                    </ul>
                </div>
            </aside>
            <div className="col-8">
                <div className="d-flex flex-column h-100 w-100">
                    <div className="flex-grow-1">
                        <div className="position-relative h-100 w-100">
                            <div className="position-absolute overflow-auto h-100 w-100">
                                <ChatMessage mine={true}/>
                                <ChatMessage mine={true}/>
                                <ChatMessage mine={false}/>
                                <ChatMessage mine={false}/>
                                <ChatMessage mine={true}/>
                                <ChatMessage mine={true}/>
                                <ChatMessage mine={false}/>
                                <ChatMessage mine={true}/>
                            </div>
                        </div>
                    </div>
                    <div className="input-group pt-3">
                        <input id="text" className="form-control" type="text"/>
                        <button className="btn btn-outline-primary">
                            <FontAwesomeIcon icon={faTelegram}/>
                            <span className="ms-2">Send</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );

}

export default Chat;
