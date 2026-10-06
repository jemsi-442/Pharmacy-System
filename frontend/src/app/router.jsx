import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DashboardPage from "../features/dashboard/DashboardPage";
import MedicinePage from "../features/medicines/MedicinePage";
import UsersPage from "../features/users/UsersPage";
import SalesPage from "../features/sales/SalesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,   // Admin shell
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "medicines", element: <MedicinePage /> },
      { path: "users", element: <UsersPage /> },
      { path: "sales", element: <SalesPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
