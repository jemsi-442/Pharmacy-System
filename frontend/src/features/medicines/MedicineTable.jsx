import { Trash2, Edit2 } from "lucide-react";

export default function MedicineTable({ medicines, onEdit, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Medicines List</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Brand</th>
            <th>Batch</th>
            <th>Expiry</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => {
            const expiry = new Date(med.expiryDate);
            const isExpiring = (expiry - new Date()) / (1000 * 60 * 60 * 24) < 30;

            return (
              <tr key={med._id} className="border-b hover:bg-gray-50">
                <td>{med.name}</td>
                <td>{med.brand}</td>
                <td>{med.batch}</td>
                <td className={isExpiring ? "text-red-500 font-bold" : ""}>
                  {expiry.toLocaleDateString()}
                </td>
                <td className={med.quantity < 10 ? "text-red-500 font-bold" : ""}>
                  {med.quantity}
                </td>
                <td>TZS {med.price}</td>
                <td className="flex gap-2">
                  <button onClick={() => onEdit(med)} className="text-blue-500 hover:underline">
                    <Edit2 className="w-4 h-4 inline" />
                  </button>
                  <button onClick={() => onDelete(med._id)} className="text-red-500 hover:underline">
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
