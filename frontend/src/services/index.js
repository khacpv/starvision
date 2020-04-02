import axiosProvider from './axiosProvider';
import AuthService from './AuthService'
import CustomerService from './CustomerService'

const authService = new AuthService(axiosProvider);
const customerService = new CustomerService(axiosProvider);

export {
    authService,
    customerService
}
