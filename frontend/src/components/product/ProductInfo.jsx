// src/components/product/ProductInfo.jsx
export default function ProductInfo({ name, description }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-gray-600 mt-2">
        {description}
      </p>
    </div>
  );
}
