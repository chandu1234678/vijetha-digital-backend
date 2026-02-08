import { useEffect, useState } from "react";
import { getMaterials, createMaterial, deleteMaterial } from "../api/admin";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const MaterialsSection = () => {
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rate_per_sqft: "",
  });

  const loadMaterials = async () => {
    try {
      const data = await getMaterials();
      setMaterials(data);
    } catch {
      toast.error("Failed to load materials");
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createMaterial({
        name: form.name,
        rate_per_sqft: Number(form.rate_per_sqft),
      });
      toast.success("Material added");
      setForm({ name: "", rate_per_sqft: "" });
      loadMaterials();
    } catch {
      toast.error("Failed to add material");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteMaterial(id);
      toast.success("Material deleted");
      loadMaterials();
    } catch {
      toast.error("Failed to delete material");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Materials</h2>

      <form onSubmit={submit} className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Material name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border p-2"
          type="number"
          placeholder="Rate / sqft"
          value={form.rate_per_sqft}
          onChange={(e) =>
            setForm({ ...form, rate_per_sqft: e.target.value })
          }
          required
        />
        <button className="bg-indigo-600 text-white px-4 rounded">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {materials.map((m) => (
          <li key={m.id} className="border p-2 rounded flex justify-between items-center">
            <span>{m.name} — ₹{m.rate_per_sqft}</span>
            <button
              onClick={() => handleDelete(m.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialsSection;
