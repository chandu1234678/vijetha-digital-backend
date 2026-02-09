import api from "./axios";

export async function createPayment(orderId) {
  const res = await api.post(`/payments/create/${orderId}`);
  return res.data;
}
