import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7000/api/user/v1',
});

export const getUsers = () => api.get('/get-users');
export const claimPoints = (userId) => api.patch(`/claim-points/${userId}`);
export const getUserHistory = (userId) => api.post('/your-history', { userId });
export const getUserInfo = (userId) => api.get(`/get-users-info-id/${userId}`);
export const login = (credentials) => api.post('/login', credentials);
export const register = (data) => api.post('/register', data);
