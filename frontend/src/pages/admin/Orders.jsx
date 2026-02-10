import { useEffect, useState } from "react";
import Container from "../../components/layout/Container";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { getAdminOrders, updateOrderStatus } from "../../api/admin";
import { formatPrice } from "../../utils/format";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH ORDERS (AUTO REFRESH) ----------------
  useEffect(() => {
    let active = true;

    const fetchOrders = async () => {
      try {
        const data = await getAdminOrders();
        if (active) setOrders(data);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchOrders();

    // Poll every 3 seconds
    const interval = setInterval(fetchOrders, 3000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  // ---------------- UPDATE STATUS ----------------
  const changeStatus = async (id, status) => {
    try {
      const updated = await updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? updated : o))
      );
    } catch (e) {
      alert(e?.response?.data?.detail || "Action not allowed");
    }
  };

  // ---------------- STATUS HELPERS ----------------
  const statusLabel = (status) => {
    switch (status) {
      case "payment_initiated":
        return "AWAITING PAYMENT CONFIRMATION";
      case "paid":
        return "PAID";
      case "completed":
        return "COMPLETED";
      case "cancelled":
        return "CANCELLED";
      default:
        return status.toUpperCase();
    }
  };

  const statusVariant = (status) => {
    if (status === "paid" || status === "completed") return "success";
    if (status === "payment_initiated") return "warning";
    if (status === "cancelled") return "danger";
    return "default";
  };

  if (loading) return <p className="p-6">Loading orders…</p>;

  return (
    <Container>
      <div className="py-10 space-y-6">
        <h1 className="text-3xl font-bold">Admin Orders</h1>

        {orders.map((o) => (
          <Card key={o.id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Order #{o.id}</p>
                <p className="text-sm text-gray-600">{o.user_email}</p>
                <p className="text-sm">₹ {formatPrice(o.total_price)}</p>

                <Badge variant={statusVariant(o.status)}>
                  {statusLabel(o.status)}
                </Badge>
              </div>

              <div className="flex gap-2">
                {/* COMPLETE — only after payment */}
                <Button
                  variant="outline"
                  disabled={o.status !== "paid"}
                  onClick={() => changeStatus(o.id, "completed")}
                >
                  Complete
                </Button>

                {/* CANCEL — only before payment */}
                <Button
                  variant="danger"
                  disabled={o.status !== "payment_initiated"}
                  onClick={() => changeStatus(o.id, "cancelled")}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
