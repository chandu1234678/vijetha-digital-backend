// src/api/payments.js
import api from "./axios";

export const createPaymentOrder = async (orderId) => {
  const res = await api.post(`/payments/create/${orderId}`);
  return res.data;
};
