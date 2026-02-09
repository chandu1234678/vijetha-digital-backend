// src/components/ui/Input.jsx
export default function Input({
  label,
  helper,
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

      <input
        className={`w-full border border-gray-300 px-3 py-2 text-sm rounded-md
          focus:outline-none focus:border-black focus:ring-1 focus:ring-black
         ${className}`}
         {...props}
      />


      {helper && (
        <p className="text-xs text-gray-500">
          {helper}
        </p>
      )}
    </div>
  );
}
