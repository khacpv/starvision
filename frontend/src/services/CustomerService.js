class CustomerService {

    constructor(axios) {
        this.axios = axios;
    }

    searchCustomer(DoctorName, CustomerName) {
        return this.axios.get(`/customer/search?d_name=${DoctorName}&c_name=${CustomerName}`);
    }

    searchCustomerByName(Dname) {
        return this.axios.get(`/customer?tenbacsi=${Dname}`);
    }
}

export default CustomerService;
