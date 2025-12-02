import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useProfile } from "src/store/useProfile";
import { useEffect, useState } from "react";
import api from "src/utils/Api";
import { useToast } from "src/store/useToast";
import { useRole } from "src/store/useRole";
import { X } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const { profile, fetchUserProfile } = useProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setLoading] = useState(false)
  const { success, error } = useToast();

  useEffect(() => {
    if (!profile?.user_id && token) fetchUserProfile();
  }, []);

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
      }, 2000)

    } catch (err) {
      console.error(err);
      error("There's something wrong...")
    }
  };


  const menuItems = token ?
      [
        { name: "Home", path: "/home" },
        { name: "Profile", path: `/profile/${profile?.user_id || ""}` },
        { name: "Recommendation", path: "/room/recomendation" },
        { name: "Live Map", path: "/live-map" },
      ]
    : [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Live Map", path: "/live-map" },
    ];


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
    <nav className="fixed top-0 w-full bg-indigo-900 text-gray-100 shadow-md z-[9999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 flex justify-between items-center h-16">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer text-green-400 hover:text-green-300 transition"
          onClick={() => navigate("/")}
        >
          LCBNB
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className="px-3 py-2 rounded hover:bg-green-400 hover:text-indigo-900 transition-all font-medium"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Right buttons */}
        <div className="hidden lg:flex items-center space-x-2">
          {token ? (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-medium transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-2 rounded border border-green-400 hover:bg-green-400 hover:text-indigo-900 font-medium transition"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6 text-green-400" /> : <Menu className="w-6 h-6 text-green-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-indigo-800 shadow-md border-t border-green-400">
          <div className="flex flex-col px-4 py-2 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-green-400 hover:text-indigo-900 transition font-medium"
              >
                {item.name}
              </button>
            ))}

            {token ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-medium transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded border border-green-400 hover:bg-green-400 hover:text-indigo-900 font-medium transition"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
