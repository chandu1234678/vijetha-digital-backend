import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../api/products";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="space-y-12 py-10 pb-20">

      {/* Hero */}
      <section>
        <h1 className="text-4xl font-bold">
          Custom Printing Made Easy
        </h1>
        <p className="text-gray-600 mt-2">
          Flex banners, vinyl prints, LED boards & more
        </p>
      </section>

      {/* Products */}
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
              <Card
                key={product.id}
                className="hover:shadow-lg transition-all duration-200"
              >
                <h3 className="text-lg font-semibold">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600">
                  {product.category}
                </p>

                <p className="text-xl font-bold mt-4">
                  ₹ {product.base_price}
                </p>

                {/* ✅ Navigation ONLY here */}
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
