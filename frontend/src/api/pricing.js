// src/api/pricing.js
import api from "./axios";

export const calculatePrice = async (payload) => {
  const res = await api.post("/pricing/calculate", payload);
  return res.data;
};
