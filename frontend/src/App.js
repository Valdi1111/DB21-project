import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Shop from './components/Shop';
import {Component} from "react";

class App extends Component {

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="shop" element={<Shop/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }

}

export default App;
