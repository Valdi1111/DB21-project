import instagram from '../icons/instagram-brands.svg'
import twitter from '../icons/twitter-brands.svg'
import facebook from '../icons/facebook-brands.svg'
import copyright from '../icons/copyright-regular.svg'

function Footer() {
    return (
        <footer>
            <div className="row">
                <div className="my-3 col-md-12 text-md-start col-lg-8 order-lg-0"><a href="#">anymeme</a></div>
                <section className="mb-3 col-md-6 text-md-start col-lg-4 order-lg-2">
                    <p className="m-0">Creator: Aldini, Alam, Valdifiori</p>
                    <p className="m-0">contact@anymeme.com</p>
                </section>
                <section className="mb-3 col-md-6 text-md-end col-lg-4 order-lg-3 text-lg-center">
                    <p className="m-0">Via Cristoforo Colombo, 35</p>
                    <p className="m-0">+39 328 70 43436</p>
                </section>
                <section className="mb-3 col-md-6 text-md-start col-lg-4 order-lg-4 text-lg-end">
                    <p className="m-0">We are hiring, write to our manager</p>
                    <p className="m-0">management@anymeme.com</p>
                </section>
                <section className="mb-3 col-md-6 text-md-end col-lg-4 order-lg-1">
                    <a className="ms-2" href="#">
                        <img src={instagram} alt="Instagram" style={{width: 20}}/>
                    </a>
                    <a className="ms-2" href="#">
                        <img src={twitter} alt="Twitter" style={{width: 20}}/>
                    </a>
                    <a className="ms-2" href="#">
                        <img src={facebook} alt="Facebook" style={{width: 20}}/>
                    </a>
                    <div>
                        <input type="checkbox" id="theme-switch" onChange="onThemeChange(this)"/>
                        <label htmlFor="theme-switch"></label>
                        <span>Dark Theme</span>
                    </div>
                </section>
            </div>
            <section className="d-flex justify-content-center">
                <img src={copyright} alt="Facebook" style={{width: 10}}/>
                <p className="mb-0 ms-2">2022 anymeme.com, s.o.s.</p>
            </section>
        </footer>
    );
}

export default Footer;