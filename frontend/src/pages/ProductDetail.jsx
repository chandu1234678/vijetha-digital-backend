import { useState } from "react";
import ImageGallery from "../components/product/ImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import CustomisationForm from "../components/product/CustomisationForm";
import OrderSummary from "../components/product/OrderSummary";
import { calculateFlexBannerPrice } from "../components/product/PriceCalculator";

export default function ProductDetail() {
  const [config, setConfig] = useState({
    width: "",
    height: "",
    material: "flex",
    quantity: 1,
  });

  const price = calculateFlexBannerPrice(config);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      <ImageGallery />

      <div className="space-y-6">
        <ProductInfo />

        <CustomisationForm
          config={config}
          setConfig={setConfig}
        />

        <OrderSummary
          config={config}
          price={price}
        />
      </div>
    </div>
  );
}
