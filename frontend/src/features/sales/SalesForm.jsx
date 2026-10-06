import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { getMedicines } from "../medicines/medicine.api";

export default function SalesForm({ onSubmit }) {
  const [medicines, setMedicines] = useState([]);
  const [selected, setSelected] = useState({ medicine: "", qty: 1 });

  useEffect(() => {
    const fetchMeds = async () => {
      const data = await getMedicines();
      setMedicines(data);
    };
    fetchMeds();
  }, []);

  const handleAdd = () => {
    if (!selected.medicine) return;
    onSubmit(selected);
    setSelected({ medicine: "", qty: 1 });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Plus className="w-5 h-5" /> New Sale
      </h2>

      <select
        className="w-full border p-2 rounded"
        value={selected.medicine}
        onChange={(e) => setSelected({ ...selected, medicine: e.target.value })}
      >
        <option value="">Select Medicine</option>
        {medicines.map((med) => (
          <option key={med._id} value={med._id}>
            {med.name} - {med.quantity} in stock
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={selected.qty}
        onChange={(e) => setSelected({ ...selected, qty: +e.target.value })}
        className="w-full border p-2 rounded"
        placeholder="Quantity"
      />

      <button
        onClick={handleAdd}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        Add to Sale
      </button>
    </div>
  );
}
