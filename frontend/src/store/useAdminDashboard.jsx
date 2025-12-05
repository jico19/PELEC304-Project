import { create } from "zustand";
import api from "src/utils/Api";


export const useAdminDashboard = create((set) => ({
    dashboardData: [],
    fetchAdminDashboardData: async () => {
        try {
            const res = await api.get("super-admin/data/");
            set({ dashboardData: res.data });
        } catch (error) {
            console.log(error);
        }
    },
}));
