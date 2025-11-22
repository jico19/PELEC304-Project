import React from "react";

const NavBar = () => {
  return (
    <div>
      <div className="navbar bg-white shadow-sm">
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
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-5 w-52 p-2 shadow flex flex-col gap-2 ">
              <li className="p-2 hover:bg-black hover:text-white transition-all rounded">Home</li>
              <li className="p-2 hover:bg-black hover:text-white transition-all rounded">About</li>
              <li className="p-2 hover:bg-black hover:text-white transition-all rounded">Recommendation</li>
              <li className="p-2 hover:bg-black hover:text-white transition-all rounded">Live Map</li>
              <li className="p-2 hover:bg-black hover:text-white transition-all rounded">Contact</li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">LCBNB</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 bg-red-400 flex gap-2">
            <li>Home</li>
            <li>About</li>
            <li>Recommendation</li>
            <li>Live Map</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn btn-outline hover:btn-soft mr-4">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
