import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -------- ORDERS --------
export const getOrders = async () => {
  const res = await API.get("/admin/orders");
  return res.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await API.patch(
    `/admin/orders/${orderId}`,
    null, // IMPORTANT: no body
    { params: { status } } // 👈 THIS is what FastAPI wants
  );
  return res.data;
};

// -------- PRICING --------
export const getMaterials = async () => {
  const res = await API.get("/admin/materials");
  return res.data;
};

export const createMaterial = async (data) => {
  const res = await API.post("/admin/materials", data);
  return res.data;
};

export const deleteMaterial = async (id) => {
  await API.delete(`/admin/materials/${id}`);
};

export const getExtras = async () => {
  const res = await API.get("/admin/extras");
  return res.data;
};

export const createExtra = async (data) => {
  const res = await API.post("/admin/extras", data);
  return res.data;
};

export const deleteExtra = async (id) => {
  await API.delete(`/admin/extras/${id}`);
};
