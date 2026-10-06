import { useState } from "react";
import { Plus } from "lucide-react";

export default function MedicineForm({ onSubmit, defaultValues }) {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    batch: "",
    expiryDate: "",
    quantity: 0,
    price: 0,
    ...defaultValues
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
        <Plus className="w-5 h-5" /> Add / Edit Medicine
      </h2>

      {["name", "brand", "batch", "expiryDate", "quantity", "price"].map((field) => (
        <input
          key={field}
          name={field}
          type={field === "expiryDate" ? "date" : field === "quantity" || field === "price" ? "number" : "text"}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required={field === "name" || field === "price"}
        />
      ))}

      <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
        Save
      </button>
    </form>
  );
}
