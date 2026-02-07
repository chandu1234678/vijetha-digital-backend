import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../api/admin";
import toast from "react-hot-toast";

const STATUSES = ["pending", "paid", "cancelled"];

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      setOrders(await getOrders());
    } catch {
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      toast.success("Status updated");
      loadOrders();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <table className="w-full bg-white rounded shadow">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-2">Order ID</th>
          <th className="p-2">Customer</th>
          <th className="p-2">Amount</th>
          <th className="p-2">Status</th>
          <th className="p-2">Update</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(o => (
          <tr key={o.id} className="border-t">
            <td className="p-2">{o.id}</td>
            <td className="p-2">{o.user_email}</td>
            <td className="p-2">₹{o.total_amount}</td>
            <td className="p-2">{o.status}</td>
            <td className="p-2">
              <select
                defaultValue={o.status}
                onChange={e => handleUpdate(o.id, e.target.value)}
                className="border p-1"
              >
                {STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
