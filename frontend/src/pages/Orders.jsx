import { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { getMyOrders } from "../api/orders";
import { formatPrice } from "../utils/format";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading orders…</p>;

  if (orders.length === 0) {
    return (
      <Container>
        <p className="p-6">No orders found.</p>
      </Container>
    );
  }

  const getBadgeVariant = (status) => {
    switch (status) {
      case "paid":
      case "completed":
        return "success";
      case "payment_initiated":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Container>
      <div className="py-12 space-y-6">
        <h1 className="text-3xl font-bold">My Orders</h1>

        {orders.map((order) => (
          <Card key={order.id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  Order #{order.id}
                </p>
                <p className="text-sm text-gray-600">
                  Total: ₹ {formatPrice(order.total_price)}
                </p>
              </div>

              <Badge variant={getBadgeVariant(order.status)}>
                {order.status.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
