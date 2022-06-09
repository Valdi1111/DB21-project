import {avatars_url} from "../../../services/ApiUrls";
import AuthService from "../../../services/AuthService";
import ImageSelector from "./ImageSelector";

function ProfileAvatar() {

    return (
        <div className="row mx-0">
            <h4 className="col-12 mb-3 text-center">Change avatar</h4>
            <div className="col-6">
                <img src={avatars_url + AuthService.user.avatar} alt="Avatar" className="rounded-circle mx-auto d-block" />
            </div>
            <div className="col-6">
                <ImageSelector />
            </div>
        </div>
    );

}

export default ProfileAvatar;