import axios from 'axios';
import { APIURL } from './utils/apiUrl';

axios.defaults.baseURL = APIURL.baseURL;

const apiInstance = axios.create();

apiInstance.interceptors.request.use(
  async config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default apiInstance;
