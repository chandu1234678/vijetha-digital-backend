import api from "./axios";

// -------- ORDERS --------
export const getOrders = async () => {
  const res = await api.get("/admin/orders");
  return res.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await api.patch(
    `/admin/orders/${orderId}`,
    null, // IMPORTANT: no body
    { params: { status } } // 👈 THIS is what FastAPI wants
  );
  return res.data;
};

// -------- PRICING --------
export const getMaterials = async () => {
  const res = await api.get("/admin/materials");
  return res.data;
};

export const createMaterial = async (data) => {
  const res = await api.post("/admin/materials", data);
  return res.data;
};

export const deleteMaterial = async (id) => {
  await api.delete(`/admin/materials/${id}`);
};

export const getExtras = async () => {
  const res = await api.get("/admin/extras");
  return res.data;
};

export const createExtra = async (data) => {
  const res = await api.post("/admin/extras", data);
  return res.data;
};

export const deleteExtra = async (id) => {
  await api.delete(`/admin/extras/${id}`);
};
