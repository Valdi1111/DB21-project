import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Shop from './components/shop/Shop';
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import Product from "./components/product/Product";
import Settings from "./components/settings/Settings";
import RequireAuth from "./services/RequireAuth";

function App() {

    return (
        <div className="container d-flex flex-column min-vh-100">
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<></>}/>
                    <Route path="*" element={<Header/>}/>
                </Routes>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="shop" element={<Shop/>}/>
                    <Route path="product/:id" element={<Product/>}/>
                    <Route path="settings/:id" element={
                        <RequireAuth>
                            <Settings/>
                        </RequireAuth>
                    }/>
                </Routes>
                <Routes>
                    <Route path="login" element={<></>}/>
                    <Route path="*" element={<Footer/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );

}

export default App;
