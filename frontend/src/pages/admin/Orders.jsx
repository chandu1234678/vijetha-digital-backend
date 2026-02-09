// src/pages/admin/Orders.jsx
import { useEffect, useState } from "react";
import { getAdminOrders } from "../../api/admin";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-2">Order ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Status</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="p-2">{o.id}</td>
                <td className="p-2">{o.user_email}</td>
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
