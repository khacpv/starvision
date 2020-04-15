class AuthService {

    constructor(axios) {
        this.axios = axios;
    }

    async login(credential) {
        return this.axios.post(`/token`, credential);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
    }

    setToken(token, profile) {
        localStorage.setItem('token', token);
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    setUser(profile) {
        localStorage.setItem('user', JSON.stringify(profile));
    }
}

export default AuthService;
