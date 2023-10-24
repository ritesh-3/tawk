import axios from 'axios';
import { BASE_URL } from '../constants/constants';


// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: BASE_URL, withCredentials: true });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || { response: { data: { message: "Something went" } } })
);

export default axiosInstance;
