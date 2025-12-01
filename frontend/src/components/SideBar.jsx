import React, { useState } from "react";
import { Flag, User, LogOut, House, LayoutDashboard, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, link: "/landlord/dashboard" },
        { name: "Properties", icon: <House className="w-5 h-5" />, link: "/landlord/properties" },
        { name: "Reports", icon: <Flag className="w-5 h-5" />, link: "/landlord/reports" },
        { name: "Profile", icon: <User className="w-5 h-5" />, link: "/landlord/profile" },
    ];

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
                        <button className="flex items-center gap-2 w-full justify-center bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded transition-colors">
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
