import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../api/products";
import Container from "../components/layout/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <Container>
      <div className="py-10">
        <h1 className="text-3xl font-bold mb-6">Products</h1>

        {products.length === 0 ? (
          <p className="text-gray-500">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.category}
                  </p>
                  <p className="text-xl font-bold mt-4">
                    ₹ {product.base_price}
                  </p>
                </div>

                <Link to={`/products/${product.id}`} className="mt-6">
                  <Button className="w-full">
                    View Details
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
