import { Trash2 } from "lucide-react";

export default function AccessLogsTable({ logs, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Access Logs</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>User</th>
            <th>Action</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-b hover:bg-gray-50">
              <td>{log.user?.name || log.user}</td>
              <td>{log.action}</td>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => onDelete(log._id)}
                  className="text-red-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
