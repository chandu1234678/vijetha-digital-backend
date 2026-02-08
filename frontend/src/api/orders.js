// src/api/orders.js
import api from "./axios";

export const placeOrder = async (order) => {
  const res = await api.post("/orders", order);
  return res.data;
};
