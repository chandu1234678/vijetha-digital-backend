import { useEffect, useState } from "react";
import { getExtras, createExtra, deleteExtra } from "../api/admin";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const ExtrasSection = () => {
  const [extras, setExtras] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  const loadExtras = async () => {
    try {
      const data = await getExtras();
      setExtras(data);
    } catch {
      toast.error("Failed to load extras");
    }
  };

  useEffect(() => {
    loadExtras();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createExtra({
        name: form.name,
        price: Number(form.price),
      });
      toast.success("Extra added");
      setForm({ name: "", price: "" });
      loadExtras();
    } catch {
      toast.error("Failed to add extra");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteExtra(id);
      toast.success("Extra deleted");
      loadExtras();
    } catch {
      toast.error("Failed to delete extra");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Extras</h2>

      <form onSubmit={submit} className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Extra name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border p-2"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <button className="bg-indigo-600 text-white px-4 rounded">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {extras.map((e) => (
          <li key={e.id} className="border p-2 rounded flex justify-between items-center">
            <span>{e.name} — ₹{e.price}</span>
            <button
              onClick={() => handleDelete(e.id)}
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

export default ExtrasSection;
