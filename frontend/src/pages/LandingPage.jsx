import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin } from "lucide-react";

import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import HeroImg from "../assets/landingpage/hero_img.png";
import { useToast } from "src/store/useToast";

const LandingPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { error } = useToast();

  const handleSearch = async () => {
    if (!search) return;

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/room/search/", { address: search });

      if (res.data.results.length === 0) {
        error("Oops! We couldn’t find anything matching your search.");
        setSearch("");
        return;
      }

      navigate("/live-map", { state: res.data.results });
    } catch (err) {
      console.error(err);
      error("Oops! Something went wrong. Please try again.");
    }
  };

  const steps = [
    { number: 1, title: "Search", desc: "Browse through hundreds of verified listings or use our map view to find rentals near you." },
    { number: 2, title: "Book", desc: "Click rent room, and then you're good to go!" },
    { number: 3, title: "Stay", desc: "Move in and enjoy your new home with peace of mind." },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <NavBar />

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-28 px-6 md:px-20 gap-6 text-white"
        style={{
          backgroundImage: `url(${HeroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/50"></div>
        <h1 className="relative z-10 text-5xl md:text-6xl font-bold text-indigo-50">
          Find Your Home in Lucena City
        </h1>
        <p className="relative z-10 max-w-2xl text-lg md:text-xl text-gray-200">
          Discover the perfect boarding house, dormitory, apartment, or hotel for students, OFWs, and professionals.
        </p>

        <div className="relative z-10 mt-8 flex w-full max-w-2xl items-center rounded-full bg-white p-4 shadow-md">
          <MapPin className="w-6 h-6 text-indigo-500 mr-3" />
          <input
            type="text"
            placeholder="Barangay, landmark, or area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-l-full border-none px-4 py-2 focus:outline-none text-gray-800"
          />
          <button
            onClick={handleSearch}
            className="rounded-r-full bg-green-500 px-6 py-2 text-white font-semibold hover:bg-green-400 transition"
          >
            Search
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="flex flex-col items-center bg-white py-24 px-6">
        <h2 className="text-3xl font-bold mb-4 text-slate-900">How LCBNB Works</h2>
        <p className="text-gray-500 mb-12 text-center max-w-2xl">
          Finding your perfect rental is just three steps away
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-5xl">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-indigo-500 text-indigo-500 font-bold text-xl mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
