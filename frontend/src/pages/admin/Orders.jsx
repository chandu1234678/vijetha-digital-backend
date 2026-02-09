import { useEffect, useState } from "react";
import Container from "../../components/layout/Container";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import {
  getAdminOrders,
  updateOrderStatus,
} from "../../api/admin";
import { formatPrice } from "../../utils/format";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const updated = await updateOrderStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? updated : o))
      );
    } catch (e) {
      alert("Failed to update order");
    }
  };

  if (loading) return <p>Loading orders…</p>;

  return (
    <Container>
      <div className="py-10 space-y-6">
        <h1 className="text-3xl font-bold">Admin Orders</h1>

        {orders.map((o) => (
          <Card key={o.id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  Order #{o.id}
                </p>
                <p className="text-sm text-gray-600">
                  {o.user_email}
                </p>
                <p className="text-sm">
                  ₹ {formatPrice(o.total_price)}
                </p>
                <Badge>{o.status}</Badge>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    changeStatus(o.id, "paid")
                  }
                >
                  Mark Paid
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    changeStatus(o.id, "completed")
                  }
                >
                  Complete
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    changeStatus(o.id, "cancelled")
                  }
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
