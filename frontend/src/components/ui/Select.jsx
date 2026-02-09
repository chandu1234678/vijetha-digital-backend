// src/components/ui/Select.jsx
export default function Select({
  label,
  options = [],
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}

      <select
        className={`w-full border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:border-black ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
