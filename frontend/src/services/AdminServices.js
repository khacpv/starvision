import axios from 'axios';

class AdminServices {
    constructor(axios) {
        this.axios = axios;
    }

    getDoctors(name) {
        return this.axios.get(`/doctor/search?doctor_name=${name}`);
    }

    getDoctorDetail(id) {
        return this.axios.get(`/doctor/${id}`);
    }

    createDoctor(data) {
        return this.axios.post(`/doctor`, data);
    }

    updateDoctor(data, id) {
        return this.axios.put(`/doctor/${id}`, data);
    }

    deleteDoctor(id) {
        return this.axios.delete(`/doctor/${id}`);
    }

    addNotification(data) {
        return this.axios.post('/notifications', data)
    }

    getOrderLenseList(limit, offset) {
        return this.axios.get(`/admin/orderlense?limit=${limit}&offset=${offset}`);
    }

    deleteOrderLense(id) {
        return this.axios.delete(`/admin/orderlense/${id}`);
    }

    getOrderDetail(id) {
        return this.axios.get(`/admin/orderlense/${id}`);
    }

    getLensePrice(type) {
        return this.axios.get(`/admin/lenseprice?type=${type}`);
    }

    updateLensePrice(govPrice, softPrice) {
        const requestOne = this.axios.post('/admin/lenseprice', govPrice);
        const requestTwo = this.axios.post('/admin/lenseprice', softPrice);
        return axios.all([requestOne, requestTwo])
    }
}

export default AdminServices;
