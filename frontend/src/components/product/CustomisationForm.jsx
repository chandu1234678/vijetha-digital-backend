export default function CustomisationForm({ config, setConfig }) {
  const update = (key, value) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <div className="space-y-4 border p-4 rounded-lg">
      <h2 className="text-xl font-semibold">
        Customise Your Banner
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Width (inches)"
          className="border p-2"
          value={config.width}
          onChange={(e) => update("width", Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Height (inches)"
          className="border p-2"
          value={config.height}
          onChange={(e) => update("height", Number(e.target.value))}
        />
      </div>

      <select
        className="border p-2 w-full"
        value={config.material}
        onChange={(e) => update("material", e.target.value)}
      >
        <option value="flex">Flex</option>
        <option value="star_flex">Star Flex</option>
        <option value="eco_flex">Eco Flex</option>
      </select>

      <input
        type="number"
        min="1"
        className="border p-2 w-full"
        value={config.quantity}
        onChange={(e) => update("quantity", Number(e.target.value))}
      />
    </div>
  );
}
