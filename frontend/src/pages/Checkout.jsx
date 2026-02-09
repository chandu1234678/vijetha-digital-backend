// src/pages/Checkout.jsx
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { createPaymentOrder } from "../api/payments";
import { useCart } from "../context/CartContext";
import useRazorpay from "../hooks/useRazorpay";

export default function Checkout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  useRazorpay();

  const handlePayment = async () => {
    try {
      // 1️⃣ Create order in backend
      const orderPayload = {
        items: items.map((item) => ({
          width_ft: Number(item.config.width) / 12,
          height_ft: Number(item.config.height) / 12,
          material: item.config.material,
          quantity: Number(item.config.quantity),
          lamination: false,
          frame: false,
        })),
      };

      const orderRes = await api.post("/orders", orderPayload);
      const orderId = orderRes.data.id;

      // 2️⃣ Create Razorpay order
      const paymentData = await createPaymentOrder(orderId);

      // 3️⃣ Open Razorpay
      const options = {
        key: paymentData.key,
        amount: paymentData.amount * 100,
        currency: "INR",
        name: "Vijetha Digital",
        description: `Order #${orderId}`,
        order_id: paymentData.razorpay_order_id,
        handler: function () {
          clearCart();
          navigate("/orders");
        },
        theme: { color: "#000000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <button
        onClick={handlePayment}
        className="bg-black text-white px-4 py-2 w-full"
      >
        Pay Now
      </button>
    </div>
  );
}
