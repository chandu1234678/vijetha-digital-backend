export default function Card({ children, className = "" }) {
  return (
    <div
      className={`border border-gray-200 bg-white rounded-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}
