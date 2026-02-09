// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProducts } from "../api/products";
import { calculatePrice } from "../api/pricing";

import ImageGallery from "../components/product/ImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import CustomisationForm from "../components/product/CustomisationForm";
import OrderSummary from "../components/product/OrderSummary";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [config, setConfig] = useState({
    width: "",
    height: "",
    material: "flex",
    quantity: 1,
    lamination: false,
    frame: false,
  });

  const [price, setPrice] = useState(0);
  const [loadingPrice, setLoadingPrice] = useState(false);

  // Load product
  useEffect(() => {
    getProducts().then((list) => {
      const found = list.find((p) => String(p.id) === id);
      setProduct(found || null);
    });
  }, [id]);

  // Calculate price whenever config changes
  useEffect(() => {
    const { width, height, material, quantity } = config;

    if (!width || !height || !material || !quantity) {
      setPrice(0);
      return;
    }

    const payload = {
      width_ft: Number(width) / 12,
      height_ft: Number(height) / 12,
      material,
      quantity: Number(quantity),
      lamination: false,
      frame: false,
    };

    setLoadingPrice(true);

    calculatePrice(payload)
      .then((res) => {
        setPrice(res.total_price);
      })
      .catch((err) => {
        console.error("Pricing error", err);
        setPrice(0);
      })
      .finally(() => setLoadingPrice(false));
  }, [config]);

  if (!product) {
    return <p className="p-6">Loading product...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      <ImageGallery />

      <div className="space-y-6">
        <ProductInfo
          name={product.name}
          description={product.category}
        />

        <CustomisationForm
          config={config}
          setConfig={setConfig}
        />

        <OrderSummary
          config={config}
          price={loadingPrice ? "Calculating..." : price}
        />
      </div>
    </div>
  );
}
