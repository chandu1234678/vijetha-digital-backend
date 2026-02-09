import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../components/layout/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../api/orders";
import { createPayment } from "../api/payments";

export default function Checkout() {
  const { items, cartLoaded, total, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (authLoading || !cartLoaded) return;
    if (!user) navigate("/login");
    else if (items.length === 0) navigate("/cart");
  }, [authLoading, cartLoaded, user, items, navigate]);

  if (authLoading || !cartLoaded) return <p>Loading…</p>;

  const gst = Math.round(total * 0.18);
  const grandTotal = total + gst;

  const handlePayment = async () => {
    try {
      setPaying(true);

      const orderPayload = {
        items: items.map((i) => ({
          product_id: i.product_id,
          width: i.config.width,
          height: i.config.height,
          material: i.config.material,
          quantity: i.quantity,
          unit_price: i.unit_price,
        })),
      };

      const order = await placeOrder(orderPayload);
      const payment = await createPayment(order.id);

      const rzp = new window.Razorpay({
        key: payment.key,
        amount: payment.amount,
        currency: "INR",
        order_id: payment.order_id,
        name: "Vijetha Digital",
        handler: () => {
          clearCart();
          navigate("/orders");
        },
      });

      rzp.open();
    } catch (e) {
      console.error(e);
      alert("Payment failed");
    } finally {
      setPaying(false);
    }
  };

  return (
    <Container>
      <div className="py-12 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((i, idx) => (
            <Card key={idx}>
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{i.name}</p>
                  <p className="text-sm text-gray-600">
                    {i.config.width}" × {i.config.height}" · {i.config.material}
                  </p>
                </div>
                <span className="font-bold">
                  ₹ {i.unit_price * i.quantity}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {total}</span>
            </div>
            <div className="flex justify-between">
              <span>GST</span>
              <span>₹ {gst}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>₹ {grandTotal}</span>
            </div>
          </div>

          <Button
            className="w-full mt-6"
            disabled={paying}
            onClick={handlePayment}
          >
            {paying ? "Processing…" : "Pay Now"}
          </Button>
        </Card>
      </div>
    </Container>
  );
}
