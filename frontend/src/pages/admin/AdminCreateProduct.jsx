import { useState } from "react";
import Container from "../../components/layout/Container";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function AdminCreateProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    base_price: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.name || !product.category || !product.base_price) {
      alert("Fill all fields");
      return;
    }

    // DEMO MODE (replace with backend later)
    console.log("New Product:", product);
    alert("Product created (demo mode)");

    setProduct({ name: "", category: "", base_price: "" });
  };

  return (
    <Container>
      <div className="py-10 max-w-xl mx-auto">
        <Card>
          <h1 className="text-2xl font-bold mb-4">
            Add New Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Product Name"
              value={product.name}
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
              }
            />

            <Input
              label="Category"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            />

            <Input
              label="Base Price (₹ per sq ft)"
              type="number"
              value={product.base_price}
              onChange={(e) =>
                setProduct({ ...product, base_price: e.target.value })
              }
            />

            <Button type="submit" className="w-full">
              Create Product
            </Button>
          </form>
        </Card>
      </div>
    </Container>
  );
}
