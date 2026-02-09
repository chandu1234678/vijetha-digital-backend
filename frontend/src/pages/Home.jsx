import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../api/products";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../utils/format";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="space-y-12 py-10 pb-20">

      <section className="space-y-4">
        <h1 className="text-4xl font-bold">
          Custom Printing Made Easy
        </h1>
        <p className="text-gray-600">
          Flex banners, vinyl prints, LED boards & more
        </p>

        {user && (
          <Button
            variant="outline"
            onClick={() => navigate("/orders")}
          >
            View My Orders
          </Button>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Popular Products
          </h2>

          <Button
            variant="outline"
            onClick={() => navigate("/products")}
          >
            View All
          </Button>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <h3 className="text-lg font-semibold">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600">
                  {product.category}
                </p>

                <p className="text-sm text-gray-500 mt-4">
                  Starting from
                </p>
                <p className="text-xl font-bold">
                  ₹ {formatPrice(product.base_price)} / sq ft
                </p>

                <Button
                  className="w-full mt-4"
                  onClick={() =>
                    navigate(`/products/${product.id}`)
                  }
                >
                  Customize
                </Button>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
