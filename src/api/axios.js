import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
})

instance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('user-storage'))?.state?.token
    config.headers['Content-Type'] = 'application/json'
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        config.headers.Authorization = `Bearer `;
    }

    return config;
})
export default instance