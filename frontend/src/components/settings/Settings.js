import SettingsBuyer from "./buyer/SettingsBuyer";
import SettingsSeller from "./seller/SettingsSeller";

function Settings(props) {

    if(props.auth.user.type === "buyer") {
        return <SettingsBuyer auth={props.auth}/>;
    }
    if(props.auth.user.type === "seller") {
        return <SettingsSeller auth={props.auth}/>;
    }

    return <></>

}

export default Settings;
