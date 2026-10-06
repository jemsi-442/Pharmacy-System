import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import AppLayout from "./layout/AppLayout";

// Pages
import DashboardPage from "./features/dashboard/DashboardPage";
import MedicinePage from "./features/medicines/MedicinePage";
import SalesPage from "./features/sales/SalesPage";
import UsersPage from "./features/users/UsersPage";
import AccessLogsPage from "./AccessLogs/AccessLogsPage";
import LoginPage from "./features/auth/LoginPage";

// Constants
import { ROLES } from "./constants";

// ----------------------------------
// Protected Route Component
// ----------------------------------
function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// ----------------------------------
// App Component
// ----------------------------------
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />

        {/* Protected Admin Area */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<DashboardPage />} />

          {/* Medicines */}
          <Route
            path="medicines"
            element={
              <ProtectedRoute roles={[ROLES.ADMIN, ROLES.PHARMACIST]}>
                <MedicinePage />
              </ProtectedRoute>
            }
          />

          {/* Sales */}
          <Route
            path="sales"
            element={
              <ProtectedRoute roles={[ROLES.ADMIN, ROLES.PHARMACIST, ROLES.CASHIER]}>
                <SalesPage />
              </ProtectedRoute>
            }
          />

          {/* Users (Admin Only) */}
          <Route
            path="users"
            element={
              <ProtectedRoute roles={[ROLES.ADMIN]}>
                <UsersPage />
              </ProtectedRoute>
            }
          />

          {/* Access Logs (Admin Only) */}
          <Route
            path="access-logs"
            element={
              <ProtectedRoute roles={[ROLES.ADMIN]}>
                <AccessLogsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
