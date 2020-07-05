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

    getCustomOkGOVById(customerId, dttc) {
        return this.axios.get(`/customok?khid=${customerId}&iddttc=${dttc}&type=GOV`);
    }

    getCustomOkSoftById(customerId, dttc) {
        return this.axios.get(`/customok?khid=${customerId}&iddttc=${dttc}&type=SOFT`);
    }

    getFittingById(customerId, dttc) {
        return this.axios.get(`/fitting?khid=${customerId}&iddttc=${dttc}`);
    }

    getOrderLenseById(customerId, dttc) {
        return this.axios.get(`/orderlense?khid=${customerId}&iddttc=${dttc}`);
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

    getFollowUpById(userId, dttc) {
        return this.axios.get(`/followup?userid=${userId}&iddttc=${dttc}`);
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

    getSummary(id_bacsi) {
        return this.axios.get(`/congno?id_bacsi=${id_bacsi}`);
    }

    getAllNotify() {
        return this.axios.get(`/notifications`);
    }

    markReadAllNotify() {
        return this.axios.post('/notifications/read/all');
    }

    getUnreadNotify() {
        return this.axios.get(`/notifications/count_unread`);
    }
}

export default CustomerService;
