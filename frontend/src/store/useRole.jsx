import api from "src/utils/Api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRole = create(
    persist(
        (set) => ({
            role: null,
            isLoading: false,

            fetchRole: async () => {
                set({ isLoading: true });
                try {
                    const res = await api.get("/get-role/");
                    set({ role: res.data.user_role, isLoading: false });
                    console.log(res.data)
                } catch (error) {
                    console.error("Failed to fetch role:", error);
                    set({ isLoading: false });
                }
            },

            clearRole: () => set({ role: null }),
        }),

        {
            name: "role-storage",     // localStorage key
            partialize: (state) => ({
                role: state.role,     // only persist the role, not isLoading
            }),
        }
    )
);
