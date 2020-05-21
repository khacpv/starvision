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
}

export default AdminServices;
