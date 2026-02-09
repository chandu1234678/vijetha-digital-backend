// src/components/ui/Button.jsx
export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-semibold transition-colors";

  const variants = {
    primary:
      "bg-[#E31E24] text-white hover:bg-[#B9161B]",
    secondary:
      "bg-black text-white hover:bg-gray-800",
    outline:
      "border border-gray-300 text-gray-900 hover:bg-gray-100",
    danger:
      "bg-[#DC2626] text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
