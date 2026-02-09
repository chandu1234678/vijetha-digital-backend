// src/pages/Products.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="border p-4 rounded cursor-pointer hover:shadow"
              onClick={() => navigate(`/products/${p.id}`)}
            >
              <h2 className="font-semibold text-lg">{p.name}</h2>
              <p className="text-sm text-gray-600">{p.category}</p>
              <p className="mt-2 font-bold">₹ {p.base_price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
