// src/api/vendorApi.ts
import { api } from "./axiosSetup";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const vendorApi = {
  getAll: async () => {
    const res = await api.get(`${API_BASE}/vendors`, {
      withCredentials: true,
    });
    return res.data;
  },

  create: async (data: { name: string; Link: string; VendorId: string }) => {
    const res = await api.post(`${API_BASE}/vendors`, data, {
      withCredentials: true,
    });
    return res.data;
  },
};
