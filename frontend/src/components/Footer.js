import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInstagram, faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faCopyright} from '@fortawesome/free-regular-svg-icons'
import {faWineGlass} from "@fortawesome/free-solid-svg-icons";

function Footer() {

    function handleThemeSwitch(e) {
        document.querySelector("body").classList.toggle("dark");
    }

    return (
        <footer className="border-top mt-auto">
            <div className="pt-3 mx-0 row">
                <div className="my-3 px-3 col-md-12 text-center text-md-start col-lg-8 order-lg-0">
                    <FontAwesomeIcon icon={faWineGlass} style={{width: 40, height: 32}}/>
                </div>
                <section className="mb-3 px-3 col-md-6 text-center text-md-start col-lg-4 order-lg-2">
                    <p className="m-0">Creator: Aldini, Alam, Valdifiori</p>
                    <p className="m-0">contact@anymeme.com</p>
                </section>
                <section className="mb-3 px-3 col-md-6 text-center text-md-end col-lg-4 order-lg-3 text-lg-center">
                    <p className="m-0">Via Cristoforo Colombo, 35</p>
                    <p className="m-0">+39 328 70 43436</p>
                </section>
                <section className="mb-3 px-3 col-md-6 text-center text-md-start col-lg-4 order-lg-4 text-lg-end">
                    <p className="m-0">We are hiring, write to our manager</p>
                    <p className="m-0">management@anymeme.com</p>
                </section>
                <section className="mb-3 px-3 col-md-6 text-center text-md-end col-lg-4 order-lg-1">
                    <a href="#" className="h5 ms-2 btn-social" style={{color: "#125688"}}>
                        <FontAwesomeIcon icon={faInstagram}/>
                    </a>
                    <a href="#" className="h5 ms-2 btn-social" style={{color: "#3B5998"}}>
                        <FontAwesomeIcon icon={faFacebook}/>
                    </a>
                    <a href="#" className="h5 ms-2 btn-social" style={{color: "#55ACEE"}}>
                        <FontAwesomeIcon icon={faTwitter}/>
                    </a>
                    <div className="form-switch">
                        <input className="form-check-input me-2" type="checkbox" role="switch" id="theme_switch"
                               onChange={handleThemeSwitch}/>
                        <label className="form-check-label" htmlFor="theme_switch">Dark Theme</label>
                    </div>
                </section>
            </div>
            <section className="d-flex justify-content-center align-items-center py-2 border-top">
                <FontAwesomeIcon icon={faCopyright} style={{width: ".65rem", height: ".65rem"}}/>
                <p className="mb-0 ms-1" style={{fontSize: "80%"}}>2022 anymeme.com, s.o.s.</p>
            </section>
        </footer>
    );

}

export default Footer;