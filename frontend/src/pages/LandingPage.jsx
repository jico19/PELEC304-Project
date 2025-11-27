import React from "react";
import NavBar from "src/components/NavBar";
import { FullRoomCard } from "src/components/RoomCard";
import Footer from "src/components/Footer";

import HeroImg from "../assets/landingpage/hero_img.png";

const LandingPage = () => {
  return (
    <div className="w-full flex flex-col bg-gray-200">
      <NavBar />

      <section
        className="w-full flex flex-col justify-center items-center py-70 px-10 gap-6 relative text-white"
        style={{
          backgroundImage: `url(${HeroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <h1 className="text-5xl font-bold text-center">
          Find Your Home in Lucena City
        </h1>
        <p className="text-center">
          Find Your Home in Lucena City Dicover the perfect boarding house,
          dormitory, apartment, or hotel for students, OFWs, and professionals
          in Lucena City.
        </p>
        <div className="bg-white flex flex-row p-5 rounded-full w-full z-10 items-center md:w-4/5 lg:w-2/5">
          <img
            src="https://img.icons8.com/?size=100&id=3723&format=png&color=000000"
            alt="Location"
            className="w-5 h-5 mr-2"
          />
          <input
            type="text"
            className="border border-gray-300 rounded-l-full px-4 py-2 w-full text-black focus:outline-none"
            placeholder="Barangay, landmark, or area..."
          />
          <select
            defaultValue="All Types"
            className="select bg-white border-2 border-gray-300 px-4 py-2 text-black rounded-r-full focus:outline-none"
          >
            <option disabled={true}>All Types</option>
          </select>
          <button className="btn btn-neutral hover:bg-white hover:text-black hover:scale-95 transition-all rounded-full ml-3">
            Search
          </button>
        </div>
      </section>

      <section className=" w-full py-30 px-10 flex flex-col items-center bg-white">
        <h1 className="text-3xl font-bold mb-2">Featured Rentals</h1>
        <p className="text-sm text-gray-500 mb-2">
          Discover our hand picked of the best rentals in Lucena City.
        </p>
        {/* Card Container */}
        <div className="w-full lg:w-4/5 grid p-5 gap-6 mb-6 justify-items-center md:grid-cols-2 lg:grid-cols-3">
          <RoomCard />
          <RoomCard />
          <RoomCard />
        </div>

        <button className="btn btn-neutral hover:bg-white hover:text-black hover:scale-95 transition-all">
          View All Rentals
        </button>
      </section>

      <section className=" w-full py-30 px-10 flex flex-col items-center bg-white">
        <h1 className="text-3xl font-bold mb-2">How LCBNB Works</h1>
        <p className="text-sm text-gray-500 mb-10">
          Finding your perfect rental is just three steps away
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 w-3/5 gap-10">
          <div className="flex flex-col items-center">
            <div className="w-13 h-13 flex justify-center items-center text-xl font-bold rounded-full border-2 border-gray-300 shadow mb-2">
              1
            </div>
            <h1 className="text-xl font-bold mb-5">Search</h1>
            <p className="text-gray-500 text-center">
              Browse through hundreds of verified listings or use our map view
              to find rentals near you.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-13 h-13 flex justify-center items-center text-xl font-bold rounded-full border-2 border-gray-300 shadow mb-2">
              2
            </div>
            <h1 className="text-xl font-bold mb-5">Book</h1>
            <p className="text-gray-500 text-center">
              Contact landlords directly, schedule visits, and secure your
              rental with confidence.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-13 h-13 flex justify-center items-center text-xl font-bold rounded-full border-2 border-gray-300 shadow mb-2">
              3
            </div>
            <h1 className="text-xl font-bold mb-5">Stay</h1>
            <p className="text-gray-500 text-center">
              Move in and enjoy your new home with peace of mind.
            </p>
          </div>
        </div>
      </section>

      <section className=" w-full py-30 px-10 flex flex-col items-center text-white bg-gray-700">
        <h1 className="text-3xl font-bold mb-2">
          Own a Property in Lucena City?
        </h1>
        <p className="text-sm text-gray-300 mb-10">
          Join LCBNB and connect with thousands of potential tenants. List your
          property for free and start earning today.
        </p>

        <button className="btn border-none hover:scale-95 transition-all bg-white text-black text-xl px-10 py-7 rounded-lg">List your Property Now </button>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
