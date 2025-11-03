import { API_BASE } from "@/lib/utils";
import { api } from "./axiosSetup";

export const caseApi = {
  getAll: () => api.get(`${API_BASE}/cases`).then((res) => res.data),
  create: (data: {
    caseId: string;
    title: string;
    status: string;
    severity: string;
    serverGroupId: number;
    vendorId: number;
  }) => api.post(`${API_BASE}/cases`, data).then((res) => res.data),
};
