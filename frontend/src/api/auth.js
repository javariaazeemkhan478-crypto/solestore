import API from './axios';
export const loginUser = (data) => API.post('/auth/login/', data);
export const registerUser = (data) => API.post('/auth/registration/', data);
export const logoutUser = () => API.post('/auth/logout/');
export const getUser = () => API.get('/auth/user/');