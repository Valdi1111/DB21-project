import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Component} from "react";
import axios from "axios";
import {api_user_url} from "./services/ApiUrls";
import Home from './components/Home';
import Login from './components/Login';
import Shop from './components/shop/Shop';
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import Product from "./components/product/Product";
import Settings from "./components/settings/Settings";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("token"),
            user: null
        }
        this.fetchData = this.fetchData.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.logout = this.logout.bind(this);
        this.getToken = this.getToken.bind(this);
        this.setToken = this.setToken.bind(this);
        this.isBuyer = this.isBuyer.bind(this);
        this.isSeller = this.isSeller.bind(this);
        this.getUser = this.getUser.bind(this);
        this.authHeader = this.authHeader.bind(this);
    }

    componentDidMount() {
        if (this.isLoggedIn()) {
            this.fetchData();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.isLoggedIn() && this.props.token !== prevState.token) {
            this.fetchData();
        }
    }

    fetchData() {
        axios
            .get(
                `${api_user_url}data`,
                {headers: this.authHeader()}
            )
            .then(
                res => {
                    //console.log(JSON.stringify(res.data))
                    this.setState({user: res.data});
                },
                err => {
                    //console.log("Error retrieving user data " + err);
                    this.logout();
                }
            )
    }

    isLoggedIn() {
        return !!this.getToken();
    }

    logout() {
        this.setState({token: null, user: null});
        localStorage.removeItem("token");
    }

    getToken() {
        return this.state.token;
    }

    setToken(token) {
        this.setState({token: token});
        localStorage.setItem("token", token);
    }

    isBuyer() {
        return this.getUser() && this.getUser().type === "buyer";
    }

    isSeller() {
        return this.getUser() && this.getUser().type === "seller";
    }

    getUser() {
        return this.state.user;
    }

    authHeader() {
        const token = this.getToken();
        if (token) {
            return {"x-access-token": token};
        } else {
            return {};
        }
    }

    render() {
        return (
            <div className="container d-flex flex-column min-vh-100">
                <BrowserRouter>
                    <Routes>
                        <Route path="login" element={<></>}/>
                        <Route path="*" element={<Header auth={this}/>}/>
                    </Routes>
                    <Routes>
                        <Route index element={<Home app={this}/>}/>
                        <Route path="login" element={<Login auth={this}/>}/>
                        <Route path="shop" element={<Shop auth={this}/>}/>
                        <Route path="product/:id" element={<Product auth={this}/>}/>
                        <Route path="settings/:id" element={<Settings auth={this}/>}/>
                    </Routes>
                    <Routes>
                        <Route path="login" element={<></>}/>
                        <Route path="*" element={<Footer auth={this}/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }

}

export default App;
