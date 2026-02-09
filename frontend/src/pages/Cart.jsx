import Container from "../components/layout/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, cartLoaded, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  if (!cartLoaded) return <p className="p-6">Loading cart…</p>;

  if (items.length === 0) {
    return (
      <Container>
        <h1 className="text-2xl font-bold py-12">Your cart is empty</h1>
        <Button onClick={() => navigate("/products")}>Browse Products</Button>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, i) => (
            <Card key={i}>
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.config.width}" × {item.config.height}" ·{" "}
                    {item.config.material}
                  </p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    ₹ {item.unit_price * item.quantity}
                  </p>
                  <button
                    className="text-red-600 text-sm"
                    onClick={() => removeFromCart(i)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <div className="flex justify-between font-bold mb-6">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>

          <Button className="w-full" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </Button>
        </Card>
      </div>
    </Container>
  );
}
