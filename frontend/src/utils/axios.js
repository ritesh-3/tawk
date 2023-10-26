import axios from 'axios';
import { BASE_URL } from '../constants/constants';


// ----------------------------------------------------------------------

console.log("api_base", import.meta.env.VITE_API_BASE)
const axiosInstance = axios.create({ baseURL: (import.meta.env.VITE_API_BASE || BASE_URL), withCredentials: true });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || { response: { data: { message: "Something went" } } })
);

export default axiosInstance;
