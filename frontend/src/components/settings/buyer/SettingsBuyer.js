import {Route, Routes} from "react-router-dom";
import SettingsTemplate from "../SettingsTemplate";
import SettingsProfile from "./SettingsProfile";
import SettingsNotifications from "../SettingsNotifications";
import SettingsPayments from "./SettingsPayments";
import SettingsAddresses from "../addresses/SettingsAddresses";

function SettingsBuyer() {
    const nav = [
        {id: "profile", name: "Profile"},
        {id: "notifications", name: "Notifications"},
        {id: "payments", name: "Payments"},
        {id: "addresses", name: "Addresses"}
    ];

    return (
       <SettingsTemplate nav={nav}>
           <Routes>
               <Route path="profile" element={<SettingsProfile/>}/>
               <Route path="notifications" element={<SettingsNotifications/>}/>
               <Route path="payments" element={<SettingsPayments/>}/>
               <Route path="addresses" element={<SettingsAddresses/>}/>
           </Routes>
       </SettingsTemplate>
    );

}

export default SettingsBuyer;