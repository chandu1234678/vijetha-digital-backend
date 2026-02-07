import api from "./axios";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { access_token, token_type }
};
