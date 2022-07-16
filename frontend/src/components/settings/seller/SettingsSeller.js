import {Route, Routes} from "react-router-dom";
import SettingsTemplate from "../SettingsTemplate";
import SettingsProfile from "./SettingsProfile";
import SettingsNotifications from "../SettingsNotifications";
import ErrorPage from "../../ErrorPage";

function SettingsSeller(props) {
    const nav = [
        {id: "profile", name: "Profile"},
        {id: "notifications", name: "Notifications"}
    ];

    return (
        <SettingsTemplate nav={nav}>
            <Routes>
                <Route path="profile" element={<SettingsProfile auth={props.auth}/>}/>
                <Route path="notifications" element={<SettingsNotifications auth={props.auth}/>}/>
                <Route path="*" element={<ErrorPage title="Page not found" name="Home" link="/"/>}/>
            </Routes>
        </SettingsTemplate>
    );

}

export default SettingsSeller;
