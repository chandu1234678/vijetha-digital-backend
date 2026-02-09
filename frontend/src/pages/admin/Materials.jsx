// src/pages/admin/Materials.jsx
import { useEffect, useState } from "react";
import { getMaterials } from "../../api/admin";

export default function AdminMaterials() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    getMaterials().then(setMaterials).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Materials</h1>

      {materials.length === 0 ? (
        <p>No materials added</p>
      ) : (
        <ul className="list-disc ml-5">
          {materials.map((m) => (
            <li key={m.id}>
              {m.name} — ₹{m.rate_per_sqft}/sqft
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
