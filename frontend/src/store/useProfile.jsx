import { create } from "zustand";
import api from "src/utils/Api";
import { persist } from "zustand/middleware";


export const useProfile = create(persist(
    (set) => ({
        profile: [],
        loading: false,

        fetchUserProfile: async () => {
            set({ loading: true })
            try {
                const res = await api.get('user/profile/')
                set({ profile: res.data })
            }
            catch (error) {
                console.log(error)
            } finally {
                set({ loading: false })
            }
        }
    }),
    { name: "profile-storage" }
))

