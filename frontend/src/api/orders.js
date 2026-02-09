import api from "./axios";

/**
 * Create a new order
 */
export async function placeOrder(payload) {
  const res = await api.post("/orders", payload);
  return res.data;
}

/**
 * Get logged-in user's orders
 */
export async function getMyOrders() {
  const res = await api.get("/orders");
  return res.data;
}
