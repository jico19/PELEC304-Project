import React from "react";

const Filter = () => {
  return (
    <div className="w-4/5 absolute top-20 z-15 ">
      <div className="flex flex-row pt-5 w-full z-10 items-center md:w-4/5 lg:w-4/5 xl:w-3/5 self-center mb-2">
        <div className="flex items-center w-full border-2 border-gray-300 bg-white rounded-full px-4 py-2 ">
          <img
            src="https://img.icons8.com/?size=100&id=3723&format=png&color=000000"
            alt="Location"
            className="w-5 h-5 mr-2"
          />
          <input
            type="text"
            className=" text-black w-full focus:outline-none"
            placeholder="Barangay, landmark, or area..."
          />
        </div>
        <button className="btn btn-neutral hover:bg-white hover:text-black hover:scale-95 transition-all rounded-full ml-3">
          Search
        </button>
      </div>


      <div className="w-full px-4 flex flex-row gap-x-2 md:gap-x-10 overflow-x-auto pb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="checkbox checkbox-md bg-white border-gray-500  text-black"
          />{" "}
          <h1 className="backdrop-blur-xs text-sm text-black font-bold">Boarding House</h1>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="checkbox checkbox-md bg-white border-gray-500  text-black"
          />{" "}
          <h1 className="backdrop-blur-xs text-sm text-black font-bold">Apartment</h1>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="checkbox checkbox-md bg-white border-gray-500  text-black"
          />{" "}
          <h1 className="backdrop-blur-xs text-sm text-black font-bold">Dorm</h1>
        </label>
      </div>
    </div>
  );
};

export default Filter;
