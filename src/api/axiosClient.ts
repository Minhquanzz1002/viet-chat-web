import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import Cookies from "js-cookie";
import {Tokens} from "../models";
import {redirect} from "react-router-dom";


console.log(import.meta.env.VITE_BASE_URL_API);
const axiosClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API,
    headers: {
        'Content-Type': 'application/json',
    },
});


// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    const token = Cookies.get('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use((response: AxiosResponse) => {
    return response && response.data ? response.data : response;
},  async (error) => {
    console.error('Error:', error);
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;
    if (error.response.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;
        try {
            const refreshToken = Cookies.get('refreshToken');
            const response = await axios.post<Tokens>(`${import.meta.env.VITE_BASE_URL_API}/v1/auth/refresh-token`, {token: refreshToken});
            const tokens = response.data;
            console.log('Refresh success', tokens);
            Cookies.set('token', tokens.accessToken);
            Cookies.set('refreshToken', tokens.refreshToken);
            if (!originalRequest.headers) {
                originalRequest.headers = {};
            }
            originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
            axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
            return axiosClient(originalRequest);
        } catch (err) {
            console.error('Refresh token failed:', err);
            Cookies.remove('token');
            Cookies.remove('refreshToken');
            return redirect("/auth/login");
            // return Promise.reject(error);
        }
    }

    if (error && error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
});

export default axiosClient;