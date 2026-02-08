import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const placeOrder = async () => {
    try {
      const payload = {
        items: items.map((item) => ({
          width_ft: Number(item.config.width),
          height_ft: Number(item.config.height),
          material: item.config.material,
          quantity: Number(item.config.quantity),
          lamination: false,
          frame: false,
        })),
      };

      await api.post("/orders", payload);

      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <button onClick={placeOrder}>
      Place Order
    </button>
  );
}
