import API from './axios';
export const getOrders = () => API.get('/orders/');
export const getOrder = (id) => API.get(`/orders/${id}/`);
export const createOrder = (data) => API.post('/orders/', data);