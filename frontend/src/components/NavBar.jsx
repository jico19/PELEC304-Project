import { useNavigate } from "react-router-dom";
import api from "src/utils/Api";
const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const LogoutHandler = async () => {
    // this function handles the log out.
    try {
      const res = await api.post("logout/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("profile_pic");
      localStorage.removeItem("refresh_token");
      navigate("/"); // <- redirect to login once logout
      console.log("you have been logout.");
      console.log(res.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  const AuthNavbar = () => (
    <div className="navbar bg-white shadow-sm fixed top-0 z-100 lg:px-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-5 w-52 p-2 shadow"
          >
            <button
              onClick={() => navigate("/home")}
              className="p-2 text-start hover:bg-black hover:text-white transition-all rounded"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/home")}
              className="p-2 text-start hover:bg-black hover:text-white transition-all rounded"
            >
              Profile
            </button>
            <button
              onClick={() => navigate("/home")}
              className="p-2 text-start hover:bg-black hover:text-white transition-all rounded"
            >
              Recommendation
            </button>
            <button
              onClick={() => navigate("/live-map")}
              className="p-2 text-start hover:bg-black hover:text-white transition-all rounded"
            >
              Live Map
            </button>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">LCBNB</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-2">
          <button
            onClick={() => navigate("/home")}
            className="p-2 hover:bg-black hover:text-white transition-all rounded"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/home")}
            className="p-2 hover:bg-black hover:text-white transition-all rounded"
          >
            Profile
          </button>
          <button
            onClick={() => navigate("/home")}
            className="p-2 hover:bg-black hover:text-white transition-all rounded"
          >
            Recommendation
          </button>
          <button
            onClick={() => navigate("/live-map")}
            className="p-2 hover:bg-black hover:text-white transition-all rounded"
          >
            Live Map
          </button>
        </ul>
      </div>

      <div className="navbar-end">
        <button
          className="btn btn-outline hover:btn-soft mr-4"
          onClick={LogoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );

  // Guest Navbar
  const GuestNavbar = () => (
    <div className="navbar bg-white shadow-sm fixed top-0 z-100 lg:px-20">
      <div className="navbar-start">
        {/* drop down */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-5 w-52 p-2 shadow"
          >
            <button
              onClick={() => navigate("/")}
              className="p-2 text-start hover:bg-black hover:text-white transition-all rounded"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/")}
              className="p-2 text-start hover:bg-black hover:text-white transition-all rounded"
            >
              Recommendation
            </button>
            <button
              onClick={() => navigate("/")}
              className="p-2 text-start hover:bg-black hover:text-white transition-all rounded"
            >
              About
            </button>
            <button
              onClick={() => navigate("/live-map")}
              className="p-2 text-start hover:bg-black hover:text-white transition-all rounded"
            >
              Live Map
            </button>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">LCBNB</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-2">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-black hover:text-white transition-all rounded"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-black hover:text-white transition-all rounded"
          >
            Recommendation
          </button>
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-black hover:text-white transition-all rounded"
          >
            About
          </button>
          <button
            onClick={() => navigate("/live-map")}
            className="p-2 hover:bg-black hover:text-white transition-all rounded"
          >
            Live Map
          </button>
        </ul>
      </div>

      <div className="navbar-end">
        <button
          className="btn hover:bg-white hover:text-black mr-4 hover:scale-95 transition-all"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
      </div>
    </div>
  );

  return token ? <AuthNavbar /> : <GuestNavbar />;
};

export default NavBar;
