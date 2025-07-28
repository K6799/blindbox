import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // 后端API地址
  timeout: 10000,
  withCredentials: false,
});

// 请求拦截器，可加token
instance.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default instance; 