import {Route, Routes} from "react-router-dom";
import SettingsTemplate from "../SettingsTemplate";
import SettingsProfile from "./SettingsProfile";
import SettingsNotifications from "../SettingsNotifications";
import SettingsProducts from "./SettingsProducts";
import SettingsProduct from "./product/SettingsProduct";
import ErrorPage from "../../ErrorPage";

function SettingsSeller() {
    const nav = [
        {id: "profile", name: "Profile"},
        {id: "products", name: "Products"}
    ];

    return (
        <SettingsTemplate nav={nav}>
            <Routes>
                <Route path="profile" element={<SettingsProfile/>}/>
                <Route path="notifications" element={<SettingsNotifications/>}/>
                <Route path="products" element={<SettingsProducts/>}/>
                <Route path="product/:id" element={<SettingsProduct/>}/>
                <Route path="*" element={<ErrorPage title="Page not found" name="Home" link="/"/>}/>
            </Routes>
        </SettingsTemplate>
    );

}

export default SettingsSeller;