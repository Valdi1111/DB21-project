import '../css/login.css'
import {useState} from "react";
import {toast} from "wc-toast";
import axios from "axios";
import {api_auth_url} from "../services/ApiUrls";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGoogle, faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {useLocation, useNavigate} from "react-router-dom";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (e.target.checkValidity()) { // use can also use e.target.reportValidity
            toast.promise(
                new Promise((resolve, reject) => {
                    axios
                        .post(
                            `${api_auth_url}signin`,
                            {
                                email: email,
                                password: password
                            }
                        )
                        .then(
                            res => {
                                if (res.status === 200) {
                                    props.auth.setToken(res.data.token);
                                    if(location.state?.from) {
                                        navigate(location.state.from);
                                    } else {
                                        navigate("/");
                                    }
                                    resolve();
                                } else {
                                    reject();
                                }
                            },
                            err => {
                                reject();
                            }
                        );
                }),
                {
                    loading: 'Authenticating...',
                    success: 'Authentication success!',
                    error: 'Authentication failed!',
                }
            )
        } else {
            e.stopPropagation();
        }
        e.target.classList.add("was-validated");
    }

    return(
        <main className="vh-100">
            <div className="row d-flex align-items-center justify-content-center h-100 px-3 mx-0">
                <div className="col-md-8 col-lg-7 col-xl-6">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                         className="img-fluid" alt="Phone image"/>
                </div>
                <div className="col-md-8 col-lg-5 col-xl-5 offset-xl-1">
                    <form onSubmit={handleSubmit} noValidate={true}>
                        {/* Email input */}
                        <div className="form-floating mb-2">
                            <input type="email" id="email_login" className="form-control form-control-lg"
                                   placeholder="name@example.com" onChange={onChangeEmail} required/>
                            <label htmlFor="email_login">Email address</label>
                            <div className="invalid-feedback">Please insert a valid email.</div>
                        </div>

                        {/* Password input */}
                        <div className="form-floating mb-2">
                            <input type="password" id="password_login" className="form-control form-control-lg"
                                   placeholder="Password" onChange={onChangePassword} minLength="8" required/>
                            <label htmlFor="password_login">Password</label>
                            <div className="invalid-feedback">Please insert a valid password.</div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            {/* Checkbox */}
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="submit_login"
                                       defaultChecked={true}/>
                                <label className="form-check-label" htmlFor="submit_login"> Remember me </label>
                            </div>
                            <a href="#">Forgot password?</a>
                        </div>

                        {/* Submit button */}
                        <button type="submit" className="btn btn-primary btn-lg btn-block w-100">Sign in</button>

                        {/* Separator */}
                        <div className="divider d-flex align-items-center my-4">
                            <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                        </div>

                        {/* Social buttons */}
                        <div className="d-flex justify-content-around align-items-center">
                            <a href="#" className="h2 btn-social" style={{color: "#dd4b39"}}>
                                <FontAwesomeIcon icon={faGoogle}/>
                            </a>
                            <a href="#" className="h2 btn-social" style={{color: "#3B5998"}}>
                                <FontAwesomeIcon icon={faFacebook}/>
                            </a>
                            <a href="#" className="h2 btn-social" style={{color: "#55ACEE"}}>
                                <FontAwesomeIcon icon={faTwitter}/>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Login;