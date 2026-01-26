import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Add a request interceptor to handle absolute vs relative paths
api.interceptors.request.use((config) => {
    // If baseURL is set (production), it will use it. 
    // If not, it falls back to '/api' which Vite proxies to localhost:5000 in dev.
    return config;
});

export default api;
