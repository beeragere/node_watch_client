import { AuthProvider } from "@/context/Auth.context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./private.route";
import Login from "../Login/Login";
import Home from "@/pages/Home";

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
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
