import { create } from "zustand";
import api from "src/utils/Api";


export const useDashboard = create(
    (set) => ({
        dashboardData: [],

        fetchDashboardData: async () => {
            try {
                const res = await api.get('dashboard/data/')
                set({ dashboardData: res.data })
            } catch (error) {
                console.log(error)
            }
        }
    })
)