import axios from "axios";
import {apiAuthUrl} from "./api";

class AuthService {

    login(email, password) {
        return axios.post(apiAuthUrl + "signin", {email: email, password: password});
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    register(username, email, password) {
        return axios.post(apiAuthUrl + "signup", {
            username,
            email,
            password
        });
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    getToken() {
        return localStorage.getItem("token");
    }

    authHeader() {
        const token = this.getToken();
        if (token) {
            // for Node.js Express back-end
            return { 'x-access-token': token };
        } else {
            return {};
        }
    }

}

export default new AuthService();