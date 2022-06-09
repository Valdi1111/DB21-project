

function UnansweredFaq(props) {

    return(
        <div>
            <div className="row mx-0 mb-2">
                <h6 className="col-auto mb-0" style={{width: "6rem"}}>Question:</h6>
                <p className="col mb-0 px-0 text-break">{props.faq.question}</p>
            </div>
            <div className="row mx-0">
                <h6 className="col-auto mb-0" style={{width: "6rem"}}>Answer:</h6>
                <div className="col px-0">
                        <textarea className="form-control faq-answer" defaultValue={props.faq.answer} disabled={true}
                                  style={{resize: "none", overflowY: "hidden"}}/>
                </div>
            </div>
            <div>
                <button className="btn btn-outline-success">Submit</button>
            </div>
        </div>
    );

}

export default UnansweredFaq;