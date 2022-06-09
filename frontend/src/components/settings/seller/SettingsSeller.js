import {Route, Routes} from "react-router-dom";
import SettingsTemplate from "../SettingsTemplate";
import SettingsProfile from "./SettingsProfile";
import SettingsNotifications from "../SettingsNotifications";
import SettingsProducts from "./SettingsProducts";
import SettingsProduct from "./product/SettingsProduct";

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
            </Routes>
        </SettingsTemplate>
    );

}

export default SettingsSeller;