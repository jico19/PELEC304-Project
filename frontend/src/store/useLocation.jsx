import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useToast } from "./useToast";

const { success, error, loading } = useToast();


const useLocation = create(
    persist(
        (set) => ({
            location: null,        // object or null (not array)
            loading: false,
            error: null,

            getLocation: () => {
                set({ loading: true, error: null });

                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const coords = {
                            lat: pos.coords.latitude,
                            long: pos.coords.longitude,
                        };
                        
                        set({
                            location: coords,
                            loading: false,
                            error: null
                        });
                    },
                    (err) => {
                        console.log("Error:", err.code, err.message);
                        error("Please turn on the location...")
                        set({
                            error: { code: err.code, message: err.message },
                            loading: false
                        });
                    }
                );
                success("Location fetched successfully.")
            }
        }),
        {
            name: "user_coords"
        }
    )
);

export default useLocation;