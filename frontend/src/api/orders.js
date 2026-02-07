import api from './axios';

export const createOrder = async (items) => {
  const response = await api.post('/orders', { items });
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get('/admin/orders');
  return response.data;
};
