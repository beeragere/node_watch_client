import { API_BASE } from "@/lib/utils";
import { api } from "./axiosSetup";

export const serverApi = {
  getAll: async () => {
    const res = await api.get(`${API_BASE}/servers`, {
      withCredentials: true,
    });
    return res.data;
  },
  create: async (data: any) => {
    const res = await api.post(`${API_BASE}/servers`, data);
    return res.data;
  },
};
