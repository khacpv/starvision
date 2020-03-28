import axios from 'axios';
import config from '../config';
import Cookies from 'js-cookie';

const axiosProvider = axios.create({
    baseURL: config.domain,
});

axiosProvider.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = localStorage.getItem('token');
    let lang = Cookies.get('next-i18next');
    config.headers.common['Accept-Language'] = lang || 'vi';
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error.response);
});

// Add a response interceptor
axiosProvider.interceptors.response.use(function (response) {
    // Do something with response data
    if(response.data) {
        return response.data;
    }
    return response;
}, function (error) {
    // Do something with response error
    if (error.response && +error.response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        return window.location.replace('/');
    }
    return Promise.reject(error);
});


export default axiosProvider;
