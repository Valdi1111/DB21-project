import {Route, Routes} from "react-router-dom";
import SettingsTemplate from "../SettingsTemplate";
import SettingsProfile from "./SettingsProfile";
import SettingsBalance from "./SettingsBalance";
import SettingsNotifications from "../SettingsNotifications";
import SettingsPayments from "./SettingsPayments";
import SettingsAddresses from "./SettingsAddresses";
import ErrorPage from "../../ErrorPage";

function SettingsBuyer(props) {
    const nav = [
        {id: "profile", name: "Profile"},
        {id: "balance", name: "Balance"},
        {id: "notifications", name: "Notifications"},
        {id: "payments", name: "Payments"},
        {id: "addresses", name: "Addresses"}
    ];

    return (
       <SettingsTemplate nav={nav}>
           <Routes>
               <Route path="profile" element={<SettingsProfile auth={props.auth}/>}/>
               <Route path="balance" element={<SettingsBalance auth={props.auth}/>}/>
               <Route path="notifications" element={<SettingsNotifications auth={props.auth}/>}/>
               <Route path="payments" element={<SettingsPayments auth={props.auth}/>}/>
               <Route path="addresses" element={<SettingsAddresses auth={props.auth}/>}/>
               <Route path="*" element={<ErrorPage title="Page not found" name="Home" link="/"/>}/>
           </Routes>
       </SettingsTemplate>
    );

}

export default SettingsBuyer;
