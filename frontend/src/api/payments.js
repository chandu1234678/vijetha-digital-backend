import api from './axios';

export const createPayment = async (orderId) => {
  const response = await api.post(`/payments/create/${orderId}`);
  return response.data;
};
