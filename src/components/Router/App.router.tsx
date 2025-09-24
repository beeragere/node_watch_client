import { AuthProvider } from "@/context/Auth.context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./private.route";
import Home from "@/pages/Home";
import AuthTabs from "../Login/AuthTabs";

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthTabs />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />{" "}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
