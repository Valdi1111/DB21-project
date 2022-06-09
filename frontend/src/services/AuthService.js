
class AuthService {
    token = null;
    user = null;

    isLoggedIn() {
        return !!this.token;
    }

    isBuyer() {
        return this.isLoggedIn() && this.user && this.user.type === "buyer";
    }

    isSeller() {
        return this.isLoggedIn() && this.user && this.user.type === "seller";
    }

    authHeader() {
        if (this.token) {
            return {"x-access-token": this.token};
        } else {
            return {};
        }
    }

    logout() {
        localStorage.removeItem("token");
        this.token = null;
        this.user = null;
    }

    setToken(token) {
        localStorage.setItem("token", token);
        this.token = token;
    }

    updateToken() {
        this.token = localStorage.getItem("token");
    }

}

export default new AuthService();