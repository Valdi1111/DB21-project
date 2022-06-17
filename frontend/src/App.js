import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Shop from './components/Shop';
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import Product from "./components/product/Product";
import Settings from "./components/settings/Settings";
import RequireAuth from "./services/RequireAuth";
import ErrorPage from "./components/ErrorPage";
import AuthService from "./services/AuthService";
import {useEffect, useState} from "react";
import axios from "axios";
import {api_user_url} from "./services/ApiUrls";

function App() {
    AuthService.updateToken();
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            fetchData();
        } else {
            setAuth(false);
        }
    }, []);

    function fetchData() {
        axios
            .get(
                `${api_user_url}data`,
                {headers: AuthService.authHeader()}
            )
            .then(
                res => {
                    AuthService.user = res.data;
                    setAuth(true);
                },
                err => {
                    logout();
                }
            )
    }

    function login(token) {
        AuthService.setToken(token);
        fetchData();
    }

    function logout() {
        AuthService.logout();
        setAuth(false);
    }

    return (
        <div className="container d-flex flex-column min-vh-100">
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<></>}/>
                    <Route path="register" element={<></>}/>
                    <Route path="*" element={<Header logged={auth} logout={logout}/>}/>
                </Routes>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="login" element={<Login login={login}/>}/>
                    <Route path="register" element={<Login login={login}/>}/>
                    <Route path="shop" element={<Shop/>}/>
                    <Route path="product/:id" element={<Product/>}/>
                    <Route path="settings/*" element={<RequireAuth><Settings/></RequireAuth>}/>
                    <Route path="*" element={<ErrorPage title="Page not found" name="Home" link="/"/>}/>
                </Routes>
                <Routes>
                    <Route path="login" element={<></>}/>
                    <Route path="register" element={<></>}/>
                    <Route path="*" element={<Footer/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
