import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {items.map((item, index) => (
        <div key={index} className="border p-4 rounded space-y-2">
          <h2 className="font-semibold">{item.name}</h2>

          <p>
            Size: {item.config.width} × {item.config.height} inches
          </p>
          <p>Material: {item.config.material}</p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(index, item.quantity - 1)}
              className="border px-2"
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => updateQuantity(index, item.quantity + 1)}
              className="border px-2"
            >
              +
            </button>

            <button
              onClick={() => removeItem(index)}
              className="ml-auto text-red-600"
            >
              Remove
            </button>
          </div>

          <p className="font-semibold">
            ₹ {item.price * item.quantity}
          </p>
        </div>
      ))}

      <hr />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Total</h2>
        <h2 className="text-xl font-bold">₹ {total}</h2>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="bg-black text-white px-4 py-2 w-full"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
