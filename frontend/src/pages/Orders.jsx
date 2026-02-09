import { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import Card from "../components/ui/Card";
import { getMyOrders } from "../api/orders";
import { useAuth } from "../context/AuthContext";

export default function Orders() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!user) return;

    getMyOrders()
      .then(setOrders)
      .finally(() => setLoadingOrders(false));
  }, [user]);

  if (loading || loadingOrders) {
    return <p className="p-6">Loading orders…</p>;
  }

  if (orders.length === 0) {
    return (
      <Container>
        <p className="p-6">No orders found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-12 space-y-6">
        <h1 className="text-3xl font-bold">My Orders</h1>

        {orders.map((order) => (
          <Card key={order.id}>
            <p className="font-semibold">
              Order #{order.id}
            </p>
            <p className="text-sm text-gray-600">
              Total: ₹ {order.total}
            </p>
          </Card>
        ))}
      </div>
    </Container>
  );
}
