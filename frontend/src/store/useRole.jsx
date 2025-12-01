import api from "src/utils/Api";
import { create } from "zustand";


export const useRole = create((set) => ({
    role: null,
    isLoading: false,

    // fetch role from backend
    fetchRole: async () => {
        set({ isLoading: true });
        try {
            const res = await api.get("/get-role/"); // your endpoint
            set({ role: res.data.user_role, isLoading: false });
        } catch (error) {
            console.error("Failed to fetch role:", error);
            set({ isLoading: false });
        }
    },

    // optional: clear on logout
    clearRole: () => set({ role: null }),
}));