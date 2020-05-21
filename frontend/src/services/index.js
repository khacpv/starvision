import axiosProvider from './axiosProvider';
import AuthService from './AuthService'
import CustomerService from './CustomerService'
import AdminServices from './AdminServices'
import UploadService from './UploadService'

const authService = new AuthService(axiosProvider);
const customerService = new CustomerService(axiosProvider);
const adminServices = new AdminServices(axiosProvider);
const uploadService = new UploadService(axiosProvider);

export {
    authService,
    customerService,
    uploadService,
    adminServices
}
