import { useState } from "react";
import { Plus } from "lucide-react";

export default function UserForm({ onSubmit, defaultValues }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "pharmacist",
    password: "",
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
        <Plus className="w-5 h-5" /> Add / Edit User
      </h2>

      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="admin">Admin</option>
        <option value="pharmacist">Pharmacist</option>
        <option value="cashier">Cashier</option>
      </select>

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required={!defaultValues}
      />

      <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
        Save
      </button>
    </form>
  );
}
