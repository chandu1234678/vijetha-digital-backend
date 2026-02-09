// src/pages/Orders.jsx
import { useEffect, useState } from "react";
import { getMyOrders } from "../api/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="p-2">{o.id}</td>
                <td className="p-2">{o.status}</td>
                <td className="p-2">₹ {o.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
