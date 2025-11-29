import React from "react";
import NavBar from "src/components/NavBar";
import { DummyFullRoomCard } from "src/components/RoomCard";
import Footer from "src/components/Footer";
import HeroImg from "../assets/landingpage/hero_img.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LandingPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const SearchHandler = async () => {
    try {
      if (!search) return; // prevents from using search if no input

      const res = await axios.post("http://127.0.0.1:8000/api/room/search/", {
        address: search,
      });
      console.log(res.data.rooms);
      // checks the data if its empty to not redirect
      if (res.data.rooms.length <= 0) {
        toast.error("No rentals found for the given location.", {
          position: "bottom-center",
        });
        return;
      }

      navigate("/live-map", { state: res.data.rooms });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col bg-gray-200">
      <NavBar />

      <section
        className="animate-fadeIn w-full flex flex-col justify-center items-center py-70 px-10 gap-6 relative text-white"
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
        <div className=" bg-gray-200 flex flex-col p-5 rounded-xl gap-2 md:gap-0 md:rounded-full w-full z-10 items-center md:flex-row md:w-4/5 lg:w-4/5 xl:w-3/5 animate-fadeIn transition-all duration-500 ease-in-out self-center ">
          <div className="border-2 border-gray-300 bg-white rounded-full md:rounded-r-none px-4 py-2 w-full text-black items-center flex">
            <img
              src="https://img.icons8.com/?size=100&id=3723&format=png&color=000000"
              alt="Location"
              className="w-5 h-5 mr-2"
            />
            <input
              type="text"
              className="w-full focus:outline-none"
              placeholder="Barangay, landmark, or area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            defaultValue="All Types"
          className="select bg-white border-2 border-gray-300 px-4 h-11 w-full md:w-3/5 lg:w-2/5 text-black rounded-full md:rounded-l-none focus:outline-none"
          >
            <option disabled={true}>All Types</option>
            <option>Boarding House</option>
            <option>Apartment</option>
            <option>Dorm</option>
          </select>
          <button
            className="btn btn-neutral hover:bg-white hover:text-black hover:scale-95 transition-all rounded-full ml-3"
            onClick={SearchHandler}
          >
            Search
          </button>
        </div>
      </section>

      <section className="animate-fadeIn w-full py-30 px-10 flex flex-col items-center bg-white">
        <h1 className="text-3xl font-bold mb-2">Featured Rentals</h1>
        <p className="text-sm text-gray-500 mb-2">
          Discover our hand picked of the best rentals in Lucena City.
        </p>

        <div className="w-full lg:w-4/5 grid p-5 gap-6 mb-6 justify-items-center md:grid-cols-2 lg:grid-cols-3">
          <DummyFullRoomCard />
          <DummyFullRoomCard />
          <DummyFullRoomCard />
        </div>

        <button
          className="btn btn-neutral hover:bg-white hover:text-black hover:scale-95 transition-all"
          onClick={() => navigate("/home")}
        >
          View All Rentals
        </button>
      </section>

      <section className=" animate-fadeIn w-full py-30 px-10 flex flex-col items-center bg-white">
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

      <section className="animate-fadeIn w-full py-30 px-10 flex flex-col items-center text-white bg-gray-700">
        <h1 className="text-3xl font-bold mb-2">
          Own a Property in Lucena City?
        </h1>
        <p className="text-sm text-gray-300 mb-10">
          Join LCBNB and connect with thousands of potential tenants. List your
          property for free and start earning today.
        </p>

        <button className="btn border-none hover:scale-95 transition-all bg-white text-black text-xl px-10 py-7 rounded-lg">
          List your Property Now{" "}
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
