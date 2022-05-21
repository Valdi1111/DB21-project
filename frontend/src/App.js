import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Shop from './components/Shop';

function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path="shop" element={<Shop/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
