import { FileClock, LayoutDashboard, Pill, ShoppingCart, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../constants";

export default function Sidebar() {
  const { user } = useAuth();
  const links = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Medicines", path: "/medicines", icon: Pill },
    { name: "Sales", path: "/sales", icon: ShoppingCart, roles: [ROLES.ADMIN, ROLES.PHARMACIST, ROLES.CASHIER] },
    { name: "Users", path: "/users", icon: Users, roles: [ROLES.ADMIN] },
    { name: "Access logs", path: "/access-logs", icon: FileClock, roles: [ROLES.ADMIN] },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold text-emerald-400 mb-10">
        PharmacySys
      </h1>

      <ul className="space-y-4">
        {links.filter((link) => !link.roles || link.roles.includes(user?.role)).map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded hover:bg-gray-800 ${
                  isActive ? "bg-gray-800" : ""
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
