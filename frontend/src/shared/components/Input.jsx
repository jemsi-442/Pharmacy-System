export default function Input({ label, className = "", ...props }) {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-gray-600 font-medium">{label}</label>}
      <input className={`border p-2 rounded ${className}`} {...props} />
    </div>
  );
}
