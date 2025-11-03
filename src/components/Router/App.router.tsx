// src/routes/AppRouter.tsx
import AppLayout from "@/components/Layout/AppLayout";
import { AuthProvider } from "@/context/Auth.context";
import Cases from "@/pages/Cases";
import Dashboard from "@/pages/Dashboard";
import Servers from "@/pages/Servers";
import Vendors from "@/pages/Vendor";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthTabs from "../Login/AuthTabs";
import PrivateRoute from "./private.route";

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
            <Route path="/servers" element={<Servers />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/vendors" element={<Vendors />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
