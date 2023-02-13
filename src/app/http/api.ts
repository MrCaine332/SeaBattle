import axios, {InternalAxiosRequestConfig} from 'axios';

export const API_URL = `https://localhost:5001`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (config.headers)
        config.headers.Authorization = `Bearer ${localStorage.getItem('user-token')}`
    return config;
})

export default $api;