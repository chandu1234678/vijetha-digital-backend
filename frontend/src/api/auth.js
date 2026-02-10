// frontend/src/api/auth.js
import api from "./axios";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });
  return res.data;
};

export const register = async (name, email, password) => {
  const res = await api.post("/auth/register", {
    name,
    email,
    password,
  });
  return res.data;
};
