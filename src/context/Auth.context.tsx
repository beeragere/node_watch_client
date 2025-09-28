// src/context/Auth.context.ts
import type {
  AuthContextType,
  LoginPayloadType,
  RegisterPayloadType,
} from "@/types/authTypes";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/axiosSetup";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // --- Check session on mount ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setIsAuthenticated(true);
        setUser(res.data);
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

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
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("useAuth must be used inside AuthProvider");
  return authContext;
}
