import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import api from "src/utils/Api";

import Logo from "src/assets/LOGO.png";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const LogoutHandler = async () => {
    try {
      await api.post("logout/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("profile_pic");
      localStorage.removeItem("refresh_token");
      navigate("/");
    } catch (error) {
      console.log(error.data);
    }
  };

  return (
    <nav className="navbar bg-white shadow-sm fixed top-0 z-50 lg:px-20">
      {/* Start: Logo & mobile menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <Menu className="h-5 w-5" />
          </label>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-5 w-52 p-2 shadow"
          >
            {token ? (
              <>
                <button onClick={() => navigate("/home")} className="p-2 text-start hover:bg-black hover:text-white transition-all rounded">Home</button>
                <button onClick={() => navigate("/home")} className="p-2 text-start hover:bg-black hover:text-white transition-all rounded">Profile</button>
                <button onClick={() => navigate("/home")} className="p-2 text-start hover:bg-black hover:text-white transition-all rounded">Recommendation</button>
                <button onClick={() => navigate("/live-map")} className="p-2 text-start hover:bg-black hover:text-white transition-all rounded">Live Map</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/")} className="p-2 text-start hover:bg-black hover:text-white transition-all rounded">Home</button>
                <button onClick={() => navigate("/")} className="p-2 text-start hover:bg-black hover:text-white transition-all rounded">Recommendation</button>
                <button onClick={() => navigate("/")} className="p-2 text-start hover:bg-black hover:text-white transition-all rounded">About</button>
                <button onClick={() => navigate("/live-map")} className="p-2 text-start hover:bg-black hover:text-white transition-all rounded">Live Map</button>
              </>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold">LCBNB</a>
      </div>

      {/* Center: desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-2">
          {token ? (
            <>
              <button onClick={() => navigate("/home")} className="p-2 hover:bg-black hover:text-white transition-all rounded">Home</button>
              <button onClick={() => navigate("/home")} className="p-2 hover:bg-black hover:text-white transition-all rounded">Profile</button>
              <button onClick={() => navigate("/home")} className="p-2 hover:bg-black hover:text-white transition-all rounded">Recommendation</button>
              <button onClick={() => navigate("/live-map")} className="p-2 hover:bg-black hover:text-white transition-all rounded">Live Map</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/")} className="p-2 hover:bg-black hover:text-white transition-all rounded">Home</button>
              <button onClick={() => navigate("/")} className="p-2 hover:bg-black hover:text-white transition-all rounded">Recommendation</button>
              <button onClick={() => navigate("/")} className="p-2 hover:bg-black hover:text-white transition-all rounded">About</button>
              <button onClick={() => navigate("/live-map")} className="p-2 hover:bg-black hover:text-white transition-all rounded">Live Map</button>
            </>
          )}
        </ul>
      </div>

      {/* End: actions */}
      <div className="navbar-end">
        {token ? (
          <button className="btn btn-outline hover:btn-soft mr-4" onClick={LogoutHandler}>Logout</button>
        ) : (
          <button className="btn hover:bg-white hover:text-black mr-4 hover:scale-95 transition-all" onClick={() => navigate("/login")}>Sign In</button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
