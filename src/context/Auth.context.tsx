// src/context/Auth.context.ts
import type {
  AuthContextType,
  LoginPayloadType,
  RegisterPayloadType,
} from "@/types/authTypes";
import { createContext, useContext, useState, type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/axiosSetup";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (payload: LoginPayloadType) => {
      const res = await api.post("/users/login", payload);
      return res.data;
    },
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data.user);
      queryClient.invalidateQueries();
    },
    onError: (err) => console.error("Login failed", err),
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterPayloadType) => {
      const res = await api.post("/users/register", payload);
      return res.data;
    },
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data.user);
      queryClient.invalidateQueries();
    },
    onError: (err) => console.error("Register failed", err),
  });

  // Functions exposed to components
  const login = (payload: LoginPayloadType) =>
    loginMutation.mutateAsync(payload);
  const register = (payload: RegisterPayloadType) =>
    registerMutation.mutateAsync(payload);
  const logout = async () => {
    await api.post("/users/logout");
    setIsAuthenticated(false);
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("useAuth must be used inside AuthProvider");
  return authContext;
}
