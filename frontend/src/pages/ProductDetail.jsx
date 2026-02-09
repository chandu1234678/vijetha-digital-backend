import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { getProducts } from "../api/products";
import { calculatePrice } from "../api/pricing";

import Container from "../components/layout/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

import ImageGallery from "../components/product/ImageGallery";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/format";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(0);
  const [loadingPrice, setLoadingPrice] = useState(false);

  const [config, setConfig] = useState({
    width: "",
    height: "",
    material: "flex",
    quantity: 1,
    lamination: false,
    frame: false,
  });

  // ======================
  // Fetch product
  // ======================
  useEffect(() => {
    getProducts()
      .then((list) => {
        const found = list.find(
          (p) => String(p.id) === String(id)
        );
        setProduct(found || null);
      })
      .catch(console.error);
  }, [id]);

  // ======================
  // Reset extras when material doesn't support them
  // ======================
  useEffect(() => {
    const noExtrasMaterials = ["flex", "star_flex", "eco_flex"];

    if (noExtrasMaterials.includes(config.material)) {
      setConfig((prev) => ({
        ...prev,
        lamination: false,
        frame: false,
      }));
    }
  }, [config.material]);

  // ======================
  // Price calculation
  // ======================
  useEffect(() => {
    const width = Number(config.width);
    const height = Number(config.height);
    const quantity = Number(config.quantity);

    if (!width || !height || quantity < 1) {
      setPrice(0);
      return;
    }

    setLoadingPrice(true);

    calculatePrice({
      width_ft: width / 12,
      height_ft: height / 12,
      material: config.material,
      quantity,
    })
      .then((res) => {
        let total = Number(res.total_price);

        const area =
          (width / 12) * (height / 12);

        // Extras only if allowed
        if (config.lamination) {
          total += area * 10 * quantity;
        }

        if (config.frame) {
          total += 50;
        }

        setPrice(total);
      })
      .catch(() => setPrice(0))
      .finally(() => setLoadingPrice(false));
  }, [config]);

  if (!product) {
    return <p className="p-6">Loading product…</p>;
  }

  const extrasAllowed = !["flex", "star_flex", "eco_flex"].includes(
    config.material
  );

  // ======================
  // Add to cart
  // ======================
  const handleAddToCart = () => {
    if (!user) return navigate("/login");
    if (price <= 0) return alert("Invalid dimensions");

    addToCart({
      product_id: product.id,
      name: product.name,
      category: product.category,
      unit_price: price,
      quantity: Number(config.quantity),
      config: {
        width: Number(config.width),
        height: Number(config.height),
        material: config.material,
        lamination: config.lamination,
        frame: config.frame,
      },
    });

    navigate("/cart");
  };

  return (
    <Container>
      {/* Breadcrumb */}
      <div className="py-6 text-sm text-gray-500 space-x-1">
        <Link to="/" className="hover:underline text-gray-700">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:underline text-gray-700">Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ImageGallery />

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.category}</p>
          </div>

          {/* Customisation */}
          <Card>
            <h2 className="font-semibold mb-4">Customise</h2>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Width (inches)"
                type="number"
                value={config.width}
                onChange={(e) =>
                  setConfig({ ...config, width: e.target.value })
                }
              />
              <Input
                label="Height (inches)"
                type="number"
                value={config.height}
                onChange={(e) =>
                  setConfig({ ...config, height: e.target.value })
                }
              />
            </div>

            <Select
              label="Material"
              value={config.material}
              onChange={(e) =>
                setConfig({ ...config, material: e.target.value })
              }
              options={[
                { label: "Flex", value: "flex" },
                { label: "Star Flex", value: "star_flex" },
                { label: "Eco Flex", value: "eco_flex" },
              ]}
            />

            <Input
              label="Quantity"
              type="number"
              value={config.quantity}
              onChange={(e) =>
                setConfig({ ...config, quantity: e.target.value })
              }
            />

            {/* Extras */}
            {!extrasAllowed && (
              <p className="text-sm text-gray-500 mt-4">
                Lamination and frame are not available for flex banners.
              </p>
            )}

            {extrasAllowed && (
              <div className="flex items-center space-x-6 mt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.lamination}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        lamination: e.target.checked,
                      })
                    }
                  />
                  <span>Lamination (+₹10 / sq ft)</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.frame}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        frame: e.target.checked,
                      })
                    }
                  />
                  <span>Frame (+₹50 flat)</span>
                </label>
              </div>
            )}
          </Card>

          {/* Price */}
          <Card>
            <p className="text-sm text-gray-500">
              Estimated Total Price
            </p>
            <p className="text-3xl font-bold">
              ₹ {loadingPrice ? "…" : formatPrice(price)}
            </p>

            <Button className="w-full mt-4" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Card>
        </div>
      </div>
    </Container>
  );
}
