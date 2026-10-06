import { Trash2, Edit2 } from "lucide-react";

export default function UsersTable({ users, onEdit, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Users List</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className={user.role === "admin" ? "text-emerald-600 font-bold" : ""}>
                {user.role}
              </td>
              <td className="flex gap-2">
                <button onClick={() => onEdit(user)} className="text-blue-500 hover:underline">
                  <Edit2 className="w-4 h-4 inline" />
                </button>
                <button onClick={() => onDelete(user._id)} className="text-red-500 hover:underline">
                  <Trash2 className="w-4 h-4 inline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
