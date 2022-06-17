import axios from "axios";
import {api_buyer_url} from "../../../../services/ApiUrls";
import AuthService from "../../../../services/AuthService";
import {toast} from "wc-toast";

function Address(props) {

    function handleDelete(e) {
        axios
            .delete(
                `${api_buyer_url}shipments/${props.address.id}`,
                {headers: AuthService.authHeader()}
            )
            .then(
                res => {
                    toast.success("AddAddress deleted successfully!");
                    props.refresh();
                },
                err => {
                    toast.error("An error occurred...");
                }
            )
    }

    return (
        <div className="row mx-0">
            <h4 className="col-12 mb-3">{props.address.name}</h4>
            <div className="col-6">
                <div className="input-group mb-2">
                    <label className="input-group-text">Street</label>
                    <input type="text" className="form-control" defaultValue={props.address.street} disabled={true}/>
                    <div className="invalid-feedback">Please insert a valid street.</div>
                </div>
            </div>
            <div className="col-3">
                <div className="input-group mb-2">
                    <label className="input-group-text">Civic</label>
                    <input type="text" className="form-control"
                           defaultValue={props.address.civic_number} disabled={true}/>
                    <div className="invalid-feedback">Please insert a valid civic number.</div>
                </div>
            </div>
            <div className="col-3">
                <div className="input-group mb-2">
                    <label className="input-group-text">Code</label>
                    <input type="text" className="form-control"
                           defaultValue={props.address.postal_code} disabled={true}/>
                    <div className="invalid-feedback">Please insert a valid postal code.</div>
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <label className="input-group-text">City</label>
                    <input type="text" className="form-control" defaultValue={props.address.city} disabled={true}/>
                    <div className="invalid-feedback">Please insert a valid city.</div>
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <label className="input-group-text">District</label>
                    <input type="text" className="form-control" defaultValue={props.address.district} disabled={true}/>
                    <div className="invalid-feedback">Please insert a valid district.</div>
                </div>
            </div>
            <div className="col-12 text-end">
                <button className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );

}

export default Address;