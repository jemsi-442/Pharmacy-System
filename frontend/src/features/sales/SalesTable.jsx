import { Trash2 } from "lucide-react";

export default function SalesTable({ sales }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Sales History</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Cashier</th>
            <th>Medicines</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id} className="border-b hover:bg-gray-50">
              <td>{sale.cashier?.name}</td>
              <td>
                {sale.medicines.map((m) => (
                  <div key={m.medicine._id}>
                    {m.medicine.name} x {m.qty} (TZS {m.priceAtSale})
                  </div>
                ))}
              </td>
              <td>TZS {sale.total}</td>
              <td>{new Date(sale.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
