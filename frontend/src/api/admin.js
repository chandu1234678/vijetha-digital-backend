import api from './axios';

export const getDashboard = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

export const getMaterials = async () => {
  const response = await api.get('/admin/materials');
  return response.data;
};

export const createMaterial = async (data) => {
  const response = await api.post('/admin/materials', data);
  return response.data;
};

export const getExtras = async () => {
  const response = await api.get('/admin/extras');
  return response.data;
};

export const createExtra = async (data) => {
  const response = await api.post('/admin/extras', data);
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.patch(`/admin/orders/${orderId}?status=${status}`);
  return response.data;
};
