// src/routes/AppRouter.tsx
import { AuthProvider } from "@/context/Auth.context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./private.route";
import AuthTabs from "../Login/AuthTabs";
import AppLayout from "@/components/Layout/AppLayout";
import Dashboard from "@/pages/Dashboard";

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<AuthTabs />} />

          {/* Authenticated */}
          <Route
            element={
              <PrivateRoute>
                <AppLayout></AppLayout>
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Dashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
