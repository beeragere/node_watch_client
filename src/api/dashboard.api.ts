// src/api/dashboard.ts
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const dashboardApi = {
  getSummary: async () => {
    const res = await axios.get(`${API_BASE}/dashboard/summary`, {
      withCredentials: true, // needed if JWT cookie is used
    });
    return res.data;
  },

  getCasesByStatus: async () => {
    const res = await axios.get(`${API_BASE}/dashboard/cases-by-status`, {
      withCredentials: true,
    });
    return res.data;
  },

  getCasesBySeverity: async () => {
    const res = await axios.get(`${API_BASE}/dashboard/cases-by-severity`, {
      withCredentials: true,
    });
    return res.data;
  },

  getCasesByVendor: async () => {
    const res = await axios.get(`${API_BASE}/dashboard/cases-by-vendor`, {
      withCredentials: true,
    });
    return res.data;
  },

  getRecentCases: async () => {
    const res = await axios.get(`${API_BASE}/dashboard/recent-cases`, {
      withCredentials: true,
    });
    return res.data;
  },
};
