import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex min-h-16 items-center justify-between border-b bg-white px-6">
      <p className="font-semibold text-gray-800">Welcome{user?.name ? `, ${user.name}` : ""}</p>
      <button
        type="button"
        onClick={logout}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </header>
  );
}
