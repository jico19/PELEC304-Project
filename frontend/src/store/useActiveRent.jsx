import { create } from "zustand";
import api from "src/utils/Api";
import { persist } from "zustand/middleware";


export const useActiveRent = create(persist(
    (set) => ({
        activeRent: [],
        loading: false,

        fetchActiveRent: async () => {
            set({ loading: true })
            try {
                const res = await api.get('active/')
                set({ activeRent: res.data.results[0] })
                console.log(res.data.results)
            } catch (error) {
                console.log(error)
            } finally {
                set({ loading: false })
            }
        }
    }), { name : "active-rent"}
))