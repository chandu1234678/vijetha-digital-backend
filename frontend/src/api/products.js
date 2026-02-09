// src/api/products.js
import api from "./axios";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};
