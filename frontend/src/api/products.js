import API from './axios';

export const getProducts = (params) => API.get('/products/', { params });
export const getProduct = (slug) => API.get(`/products/${slug}/`);
export const getCategories = () => API.get('/products/categories/');
export const getBrands = () => API.get('/products/brands/');
export const getFeatured = () => API.get('/products/featured/');
export const getNewArrivals = () => API.get('/products/new-arrivals/');
export const getBestSellers = () => API.get('/products/best-sellers/');
export const getReviews = (productId) => API.get(`/reviews/${productId}/`);
export const createReview = (productId, data) => API.post(`/reviews/${productId}/`, data);