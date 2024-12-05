import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("error in api")
    return Promise.reject(error);
  }
);

export default api;

