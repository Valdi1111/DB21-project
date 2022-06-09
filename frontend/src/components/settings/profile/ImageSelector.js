import {Component, createRef} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import FormData from "form-data";
import axios from "axios";
import {api_user_url} from "../../../services/ApiUrls";
import AuthService from "../../../services/AuthService";
import {toast} from "wc-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowRotateLeft, faArrowRotateRight} from "@fortawesome/free-solid-svg-icons";

class ImageSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSrc: ""
        };
        this.fileInput = createRef();
        this.fileReader = new FileReader();
        this.cropper = createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleCommit = this.handleCommit.bind(this);
        this.handleRotateRight = this.handleRotateRight.bind(this);
        this.handleRotateLeft = this.handleRotateLeft.bind(this);
    }

    handleChange(e) {
        this.setState({imageSrc: URL.createObjectURL(e.target.files[0])});
        document.getElementById("cover-cropper").classList.remove("d-none");
        document.getElementById("cover-rotate-right").classList.remove("d-none");
        document.getElementById("cover-rotate-left").classList.remove("d-none");
    }

    handleRotateRight() {
        this.cropper.current.cropper.rotate(90);
    }

    handleRotateLeft() {
        this.cropper.current.cropper.rotate(-90);
    }

    handleCommit(e) {
        if (!this.state.imageSrc) {
            toast.error("Select an image!");
            return;
        }
        this.cropper.current.cropper
            .getCroppedCanvas()
            .toBlob(function (blob) {
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
                            if (res.status === 200) {
                                toast.success("Avatar changed successfully!");
                                document.getElementById("cover-cropper").classList.add("d-none");
                                document.getElementById("cover-rotate-right").classList.add("d-none");
                                document.getElementById("cover-rotate-left").classList.add("d-none");
                            }
                        },
                        err => {
                            toast.error("An error occurred...");
                        }
                    );
            });
    }

    render() {
        return (
            <>
                <input type="file" className="form-control mb-2" accept="image/jpeg,image/png" ref={this.fileInput}
                       onChange={this.handleChange}/>
                <div id="cover-cropper" className="d-none mb-2">
                    <Cropper
                        style={{width: "100%", height: 256}}
                        dragMode={"move"}
                        ref={this.cropper}
                        src={this.state.imageSrc}
                        aspectRatio={1}
                        minCropBoxWidth={256}
                        minCropBoxHeight={256}
                    />
                </div>
                <div className="w-100 text-end">
                    <span id="cover-rotate-left" className="d-none btn btn-outline-secondary me-2"
                          onClick={this.handleRotateLeft}><FontAwesomeIcon icon={faArrowRotateLeft}/></span>
                    <span id="cover-rotate-right" className="d-none btn btn-outline-secondary me-2"
                          onClick={this.handleRotateRight}><FontAwesomeIcon icon={faArrowRotateRight}/></span>
                    <button className="btn btn-outline-success" onClick={this.handleCommit}>Submit</button>
                </div>
            </>
        );
    }

}

export default ImageSelector;