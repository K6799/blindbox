import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // 后端服务地址
});

// 请求拦截器，用于在每个请求中附加token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// 用户认证
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);
export const getProfile = () => API.get('/users/profile');

// 盲盒
export const fetchBlindBoxes = () => API.get('/blindboxes');
export const fetchBlindBoxDetail = (id) => API.get(`/blindboxes/${id}`);
export const searchBlindBoxes = (query) => API.get(`/blindboxes/search?query=${query}`);
export const drawBlindBox = (blindBoxId) => API.post('/blindboxes/draw', { blindBoxId });

// 订单和记录
export const fetchDrawHistory = () => API.get('/orders/history');

// 玩家秀
export const fetchShowcases = () => API.get('/showcases');
export const createShowcase = (showcaseData) => API.post('/showcases', showcaseData);

