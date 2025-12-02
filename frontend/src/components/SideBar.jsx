import { useState, useEffect } from "react";
import { Flag, User, LogOut, House, LayoutDashboard, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "src/utils/Api";
import { useToast } from "src/store/useToast";
import { useProfile } from "src/store/useProfile";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { success, error } = useToast()
    const [isLoading, setLoading] = useState(false)
    const { profile, fetchUserProfile } = useProfile()

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, link: "/landlord/dashboard" },
        { name: "Properties", icon: <House className="w-5 h-5" />, link: "/landlord/properties" },
        { name: "Reports", icon: <Flag className="w-5 h-5" />, link: "/landlord/reports" },
        { name: "Profile", icon: <User className="w-5 h-5" />, link: `/landlord/reports/${profile.user_id}` },
    ];

    const handleLogout = async () => {
        try {
            await api.post("logout/", { refresh_token: localStorage.getItem("refresh_token") });
            setLoading(true)
            setTimeout(() => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('profile-storage')
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('profile_pic')
                localStorage.removeItem('user_coords')
                localStorage.removeItem('role-storage')
                navigate("/");
                success("Successfully logged out.")
                setLoading(false)
            }, 1500)

        } catch (err) {
            console.error(err);
            error("There's something wrong...")
        }
    };

    useEffect(() => {
        if (localStorage.getItem('access_token')) fetchUserProfile();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                    <p className="text-lg font-medium text-gray-700">Logging out...</p>
                </div>
            </div>
        );
    }


    return (
        <>
            {/* Mobile Hamburger */}
            <div className="lg:hidden flex items-center bg-indigo-600 text-white p-4">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <span className="ml-4 font-bold text-lg">Dashboard</span>
            </div>

            {/* Layout wrapper */}
            <div className="flex min-h-screen">
                {/* Sidebar Desktop */}
                <div className="hidden lg:flex lg:flex-col lg:w-64 bg-indigo-600 text-white">
                    <div className="p-6 text-2xl font-bold border-b border-indigo-500">
                        Landlord Dashboard
                    </div>
                    <nav className="flex-1 mt-6">
                        {menuItems.map((item) => (
                            <button
                                key={item.name}
                                className="flex items-center gap-3 p-4 hover:bg-indigo-500 transition-colors w-full text-left"
                                onClick={() => navigate(item.link)}
                            >
                                {item.icon}
                                {item.name}
                            </button>
                        ))}
                    </nav>
                    <div className="p-4 border-t border-indigo-500">
                        <button
                            className="flex items-center gap-2 w-full justify-center bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded transition-colors"
                            onClick={() => handleLogout()}
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
