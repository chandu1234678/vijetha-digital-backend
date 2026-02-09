// src/pages/admin/Extras.jsx
import { useEffect, useState } from "react";
import { getExtras } from "../../api/admin";

export default function AdminExtras() {
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    getExtras().then(setExtras).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Extras</h1>

      {extras.length === 0 ? (
        <p>No extras added</p>
      ) : (
        <ul className="list-disc ml-5">
          {extras.map((e) => (
            <li key={e.id}>
              {e.name} — ₹{e.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
