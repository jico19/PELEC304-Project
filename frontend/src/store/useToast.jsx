import { toast } from "react-hot-toast";

export const useToast = () => {
    const success = (message, options = {}) => {
        toast.success(message, options);
    };

    const error = (message, options = {}) => {
        toast.error(message, options);
    };

    const loading = (message, options = {}) => {
        return toast.loading(message, options);
    };


    const custom = (message, options = {}) => {
        toast(message, options);
    };

    return { success, error, loading, custom };
};
