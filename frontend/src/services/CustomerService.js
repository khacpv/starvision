import axios from 'axios';

class CustomerService {

    constructor(axios) {
        this.axios = axios;
    }

    getUserData(id) {
        return this.axios.get(`/user?id=${id}`);
    }

    searchCustomer(DoctorName, CustomerName) {
        return this.axios.get(`/customer/search?d_name=${DoctorName}&c_name=${CustomerName}`);
    }

    searchCustomerByName(Dname) {
        return this.axios.get(`/customer?tenbacsi=${Dname}`);
    }

    addCustomer(data) {
        return this.axios.post(`/customer`, data);
    }

    getCustomOkById(customerId, dttc) {
        return this.axios.get(`/customok?khid=${customerId}&iddttc=${dttc}`);
    }

    getFittingById(customerId, dttc) {
        return this.axios.get(`/fitting?khid=${customerId}&iddttc=${dttc}`);
    }

    getOrderLenseById(customerId, dttc) {
        return this.axios.get(`/orderlense?khid=${customerId}&iddttc=${dttc}`);
    }

    getFollowUpById(userId, dttc) {
        return this.axios.get(`/followup?userid=${userId}&iddttc=${dttc}`);
    }

    createCustomOk(data) {
        return this.axios.post(`/customok`, data);
    }

    createFitting(dataLeft, dataRight) {
        const requestOne = this.axios.post('/fitting', dataLeft);
        const requestTwo = this.axios.post('/fitting', dataRight);
        return axios.all([requestOne, requestTwo])
    }

    createFollowUp(data) {
        return this.axios.post(`/followup`, data);
    }

    createOrderLense(data) {
        return this.axios.post(`/orderlense`, data);
    }

    updateOrderLense(data) {
        return this.axios.post(`/orderlense/update`, data);
    }

    deleteOrderLense(data) {
        return this.axios.post(`/orderlense/cancel`, data);
    }
}

export default CustomerService;
