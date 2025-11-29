import React from "react";

const Search = ({ isSearchCollapsed }) => {
  return (
    <div
      className={` bg-gray-200 flex flex-col p-5 rounded-xl gap-2 md:gap-0 md:rounded-full w-full z-10 items-center md:flex-row md:w-4/5 lg:w-4/5 xl:w-3/5 animate-fadeIn transition-all duration-500 ease-in-out self-center ${
        isSearchCollapsed ? "scale-95" : "scale-100"
      }`}
    >
      <div className="border-2 border-gray-300 bg-white rounded-full md:rounded-l-full px-4 py-2 w-full text-black items-center flex">
        <img
          src="https://img.icons8.com/?size=100&id=3723&format=png&color=000000"
          alt="Location"
          className="w-5 h-5 mr-2"
        />
        <input
          type="text"
          className=" focus:outline-none w-full"
          placeholder="Barangay, landmark, or area..."
        />
      </div>
      <select
        defaultValue="All Types"
        className="select bg-white border-2 border-gray-300 px-4 py-2 text-black rounded-full md:rounded-r-full focus:outline-none"
      >
        <option disabled={true}>All Types</option>
      </select>
      <button className="btn btn-neutral  hover:bg-white hover:text-black hover:scale-95 transition-all rounded-full ml-3">
        Search
      </button>
    </div>
  );
};

export default Search;
