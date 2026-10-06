import { useEffect, useState } from "react";
import { getDashboardStats } from "./dashboard.api";
import { AlertCircle } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

export default function DashboardPage() {
  const [stats, setStats] = useState({ lowStock: [], totalSales: 0, totalUsers: 0, sales: [], medicines: [] });

  const fetchStats = async () => {
    const data = await getDashboardStats();
    setStats(data);
  };

  useEffect(() => { fetchStats(); }, []);

  // Prepare sales by day for chart
  const salesByDate = stats.sales.reduce((acc, sale) => {
    const date = new Date(sale.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + sale.total;
    return acc;
  }, {});

  const chartData = Object.entries(salesByDate).map(([date, total]) => ({ date, total }));

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-600 font-medium">Total Sales</h2>
          <p className="text-xl font-bold text-emerald-600">TZS {stats.totalSales}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-600 font-medium">Total Users</h2>
          <p className="text-xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <div>
            <h2 className="text-gray-600 font-medium">Low Stock Medicines</h2>
            <p className="text-red-500 font-bold">{stats.lowStock.length}</p>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Sales by Day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Low Stock Medicines List */}
      {stats.lowStock.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" /> Low Stock Medicines
          </h2>
          <ul className="list-disc pl-5">
            {stats.lowStock.map((m) => (
              <li key={m._id}>{m.name} - Qty: {m.quantity}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
