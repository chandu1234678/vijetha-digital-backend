// src/api/orders.js
import api from "./axios";

// Create order (already used)
export const placeOrder = async (order) => {
  const res = await api.post("/orders", order);
  return res.data;
};

// Get customer orders
export const getMyOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};
