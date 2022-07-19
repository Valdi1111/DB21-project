import {BrowserRouter, Routes, Route, HashRouter} from 'react-router-dom';
import {api_user_url} from "./services/ApiUrls";
import {useEffect, useState} from "react";
import {toast} from "wc-toast";
import axios from "axios";
import RequireBuyerSeller from "./services/RequireBuyerSeller";
import RequireSeller from "./services/RequireSeller";
import RequireBuyer from "./services/RequireBuyer";
import RequireAuth from "./services/RequireAuth";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Login from "./components/Login";
import Shop from "./components/Shop";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import Product from "./components/product/Product";
import Settings from "./components/settings/Settings";
import Order from "./components/Order";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import MyProduct from "./components/myproducts/product/MyProduct";
import MyProducts from "./components/myproducts/MyProducts";
import Chat from "./components/Chat";
import ChatId from "./components/ChatId";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import RequireAdministrator from "./services/RequireAdministrator";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        if(!token) {
            return;
        }
        axios
            .get(
                `${api_user_url}data`,
                {headers: {"x-access-token": token}}
            )
            .then(
                res => {
                    const a = {};
                    a["token"] = token;
                    a["user"] = res.data;
                    setAuth(a)
                },
                err => {
                    toast.error("An error occurred...");
                    setToken("");
                }
            );
    }, [token]);

    function login(t) {
        localStorage.setItem("token", t);
        setToken(t);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken("");
        setAuth(null);
    }

    return (
        <div className="container d-flex flex-column min-vh-100">
            <HashRouter>
                <Routes>
                    <Route path="login" element={<></>}/>
                    <Route path="*" element={<Header auth={auth} logout={logout}/>}/>
                </Routes>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="login" element={<Login login={login}/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="shop" element={<Shop/>}/>
                    <Route path="product/:id" element={<Product auth={auth}/>}/>
                    <Route path="cart" element={
                        <RequireBuyer auth={auth}><Cart auth={auth}/></RequireBuyer>
                    }/>
                    <Route path="orders" element={
                        <RequireBuyer auth={auth}><Orders auth={auth}/></RequireBuyer>
                    }/>
                    <Route path="order/:id" element={
                        <RequireBuyer auth={auth}><Order auth={auth}/></RequireBuyer>
                    }/>
                    <Route path="my-products" element={
                        <RequireSeller auth={auth}><MyProducts auth={auth}/></RequireSeller>
                    }/>
                    <Route path="my-product/:id" element={
                        <RequireSeller auth={auth}><MyProduct auth={auth}/></RequireSeller>
                    }/>
                    <Route path="chat" element={
                        <RequireBuyerSeller auth={auth}><Chat auth={auth}/></RequireBuyerSeller>
                    }/>
                    <Route path="chat/:id" element={
                        <RequireBuyerSeller auth={auth}><ChatId auth={auth}/></RequireBuyerSeller>
                    }/>
                    <Route path="settings/*" element={
                        <RequireAuth auth={auth}><Settings auth={auth}/></RequireAuth>
                    }/>
                    <Route path="dashboard" element={
                        <RequireAdministrator auth={auth}><Dashboard auth={auth}/></RequireAdministrator>
                    }/>
                    <Route path="*" element={<ErrorPage title="Page not found" name="Home" link="/"/>}/>
                </Routes>
                <Routes>
                    <Route path="login" element={<></>}/>
                    <Route path="*" element={<Footer/>}/>
                </Routes>
            </HashRouter>
        </div>
    );

}

export default App;
