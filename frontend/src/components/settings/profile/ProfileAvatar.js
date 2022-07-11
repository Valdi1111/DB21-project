import {api_user_url, avatars_url} from "../../../services/ApiUrls";
import AuthService from "../../../services/AuthService";
import ImageSelector from "./ImageSelector";
import FormData from "form-data";
import axios from "axios";
import {toast} from "wc-toast";

function ProfileAvatar() {

    function handleCommit(blob, done) {
        let data = new FormData();
        data.append("avatar", blob, "avatar.png");
        axios
            .put(
                `${api_user_url}data/avatar`,
                data,
                {
                    headers: {
                        "content-type": "multipart/form-data",
                        "x-access-token": AuthService.token
                    }
                }
            )
            .then(
                res => {
                    toast.success("Avatar changed successfully!");
                    done();
                },
                err => toast.error("An error occurred...")
            );
    }

    return (
        <div className="row mx-0">
            <h4 className="mb-3 text-center">Change avatar</h4>
            <div className="col-6">
                <img src={avatars_url + AuthService.user.avatar} alt="Avatar"
                     className="img-thumbnail mx-auto d-block w-75"/>
            </div>
            <div className="col-6">
                <ImageSelector commit={handleCommit}/>
            </div>
        </div>
    );

}

export default ProfileAvatar;
