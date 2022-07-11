import {useRef, useState} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {toast} from "wc-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowRotateLeft, faArrowRotateRight} from "@fortawesome/free-solid-svg-icons";

function ImageSelector(props) {
    const [imageSrc, setImageSrc] = useState("");
    const input = useRef();
    const cropper = useRef();

    function handleChange(e) {
        if (!e.target.files[0]) {
            document.getElementById("image-cropper").classList.add("d-none");
            document.getElementById("image-rotate-right").classList.add("d-none");
            document.getElementById("image-rotate-left").classList.add("d-none");
            return;
        }
        setImageSrc(URL.createObjectURL(e.target.files[0]));
        document.getElementById("image-cropper").classList.remove("d-none");
        document.getElementById("image-rotate-right").classList.remove("d-none");
        document.getElementById("image-rotate-left").classList.remove("d-none");
    }

    function handleRotateRight() {
        cropper.current.cropper.rotate(90);
    }

    function handleRotateLeft() {
        cropper.current.cropper.rotate(-90);
    }

    function handleDone() {
        input.current.value = "";
        document.getElementById("image-cropper").classList.add("d-none");
        document.getElementById("image-rotate-right").classList.add("d-none");
        document.getElementById("image-rotate-left").classList.add("d-none");
    }

    function handleCommit(e) {
        if (!imageSrc) {
            toast.error("Select an image!");
            return;
        }
        cropper.current.cropper
            .getCroppedCanvas()
            .toBlob(blob => {
                props.commit(blob, handleDone);
            });
    }

    return (
        <>
            <input type="file" className="form-control mb-2" accept="image/jpeg,image/png" ref={input}
                   onChange={handleChange}/>
            <div id="image-cropper" className="d-none mb-2">
                <Cropper
                    style={{width: "100%", height: 256}}
                    dragMode={"move"}
                    ref={cropper}
                    src={imageSrc}
                    aspectRatio={1}
                    minCropBoxWidth={256}
                    minCropBoxHeight={256}
                />
            </div>
            <div className="w-100 text-end">
                <span id="image-rotate-left" className="d-none btn btn-outline-secondary me-2"
                      onClick={handleRotateLeft}><FontAwesomeIcon icon={faArrowRotateLeft}/></span>
                <span id="image-rotate-right" className="d-none btn btn-outline-secondary me-2"
                      onClick={handleRotateRight}><FontAwesomeIcon icon={faArrowRotateRight}/></span>
                <button className="btn btn-outline-success" onClick={handleCommit}>Submit</button>
            </div>
        </>
    );

}

export default ImageSelector;
