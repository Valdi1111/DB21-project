import AuthService from "../../services/AuthService";
import SettingsBuyer from "./buyer/SettingsBuyer";
import SettingsSeller from "./seller/SettingsSeller";

function Settings() {

    if(AuthService.isBuyer()) {
        return <SettingsBuyer/>;
    }
    if(AuthService.isSeller()) {
        return <SettingsSeller/>;
    }

    return <></>

}

export default Settings;