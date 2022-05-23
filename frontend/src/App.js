import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Shop from './components/Shop';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/Product";

function App() {
    return (
        <div className="container">
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
