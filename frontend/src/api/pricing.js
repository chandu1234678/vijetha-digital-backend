import api from './axios';

export const calculatePrice = async (data) => {
  const response = await api.post('/pricing/calculate', data);
  return response.data;
};
