import { useEffect, useState } from "react";
import Container from "../../components/layout/Container";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { getMyOrders } from "../../api/orders";
import { formatPrice } from "../../utils/format";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then(setOrders);
  }, []);

  const updateStatus = (id, status) => {
    // FRONTEND SIMULATION (safe for now)
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status } : o
      )
    );
  };

  const badge = (status) => {
    if (status === "paid" || status === "completed") return "success";
    if (status === "payment_initiated") return "warning";
    return "default";
  };

  return (
    <Container>
      <div className="py-10 space-y-6">
        <h1 className="text-3xl font-bold">Admin – Orders</h1>

        {orders.map((o) => (
          <Card key={o.id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Order #{o.id}</p>
                <p className="text-sm text-gray-600">
                  ₹ {formatPrice(o.total_price)}
                </p>
                <Badge variant={badge(o.status)}>
                  {o.status.toUpperCase()}
                </Badge>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => updateStatus(o.id, "paid")}
                >
                  Mark Paid
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updateStatus(o.id, "completed")}
                >
                  Complete
                </Button>
                <Button
                  variant="danger"
                  onClick={() => updateStatus(o.id, "cancelled")}
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
