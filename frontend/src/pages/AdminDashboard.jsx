import { useState, useEffect } from "react";
import OrdersTable from "../components/OrdersTable";
import {
  getMaterials,
  createMaterial,
  getExtras,
  createExtra,
} from "../api/admin";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [tab, setTab] = useState("orders");
  const [materials, setMaterials] = useState([]);
  const [extras, setExtras] = useState([]);
  const [material, setMaterial] = useState({ name: "", rate_per_sqft: "" });
  const [extra, setExtra] = useState({ name: "", price: "" });

  useEffect(() => {
    if (tab === "materials") loadMaterials();
    if (tab === "extras") loadExtras();
  }, [tab]);

  const loadMaterials = async () => {
    try {
      setMaterials(await getMaterials());
    } catch {
      toast.error("Failed to load materials");
    }
  };

  const loadExtras = async () => {
    try {
      setExtras(await getExtras());
    } catch {
      toast.error("Failed to load extras");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-6 mb-6">
          {["orders", "materials", "extras"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`capitalize ${
                tab === t
                  ? "font-bold text-indigo-600"
                  : "text-slate-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "orders" && <OrdersTable />}

        {tab === "materials" && (
          <>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await createMaterial({
                  name: material.name,
                  rate_per_sqft: Number(material.rate_per_sqft),
                });
                toast.success("Material added");
                setMaterial({ name: "", rate_per_sqft: "" });
                loadMaterials();
              }}
              className="flex gap-2 mb-4"
            >
              <input
                placeholder="Material name"
                value={material.name}
                onChange={(e) =>
                  setMaterial({ ...material, name: e.target.value })
                }
                className="border p-2 rounded"
                required
              />
              <input
                placeholder="Rate per sqft"
                type="number"
                value={material.rate_per_sqft}
                onChange={(e) =>
                  setMaterial({
                    ...material,
                    rate_per_sqft: e.target.value,
                  })
                }
                className="border p-2 rounded"
                required
              />
              <button className="bg-indigo-600 text-white px-4 rounded">
                Add
              </button>
            </form>

            {materials.map((m) => (
              <div key={m.id}>
                {m.name} – ₹{m.rate_per_sqft}
              </div>
            ))}
          </>
        )}

        {tab === "extras" && (
          <>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await createExtra({
                  name: extra.name,
                  price: Number(extra.price),
                });
                toast.success("Extra added");
                setExtra({ name: "", price: "" });
                loadExtras();
              }}
              className="flex gap-2 mb-4"
            >
              <input
                placeholder="Extra name"
                value={extra.name}
                onChange={(e) =>
                  setExtra({ ...extra, name: e.target.value })
                }
                className="border p-2 rounded"
                required
              />
              <input
                placeholder="Price"
                type="number"
                value={extra.price}
                onChange={(e) =>
                  setExtra({ ...extra, price: e.target.value })
                }
                className="border p-2 rounded"
                required
              />
              <button className="bg-indigo-600 text-white px-4 rounded">
                Add
              </button>
            </form>

            {extras.map((e) => (
              <div key={e.id}>
                {e.name} – ₹{e.price}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
