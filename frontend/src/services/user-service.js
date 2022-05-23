import axios from 'axios';
import AuthService from './auth-service';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {

    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', {headers: AuthService.authHeader()});
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', {headers: AuthService.authHeader()});
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', {headers: AuthService.authHeader()});
    }

}

export default new UserService();