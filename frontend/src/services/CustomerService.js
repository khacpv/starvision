class AuthService {

    constructor(axios) {
        this.axios = axios;
    }

    searchCustomer(Dname, Cname) {
        return this.axios.get(`/customer/search?d_name=${Dname}&c_name=${Cname}`);
    }
}

export default AuthService;
