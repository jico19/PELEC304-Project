import { useState, useEffect, useRef } from "react";
import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import api from "src/utils/Api";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const LiveMapView = () => {
  const [rentals, setRentals] = useState([]);
  const location = useLocation();
  const [selectedRental, setSelectedRental] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchRentals = async () => {
      if (location.state) {
        setRentals(location.state);
        return;
      }
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/room/locations/"
        );
        const validRentals = res.data.data
          .map((item) => ({
            ...item,
            lat: parseFloat(item.lat),
            long: parseFloat(item.long),
          }))
          .filter((item) => !isNaN(item.lat) && !isNaN(item.long));
        setRentals(validRentals);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRentals();
  }, [location.state]);

  const priceIcon = (price) =>
    L.divIcon({
      html: `<div class="flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white shadow w-10 h-10">$${price}</div>`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

  // Click outside closes card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".leaflet-marker-icon")) return;
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowCard(false);
        setTimeout(() => setSelectedRental(null), 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkerClick = async (slug) => {
    try {
      const res = await api.get(`room/${slug}/`);
      setSelectedRental(res.data);
      setShowCard(true); // smooth show
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white overflow-hidden">
      <NavBar />

      <div className="relative flex-1 w-full h-[calc(100vh-4rem)] mt-16">
        <MapContainer
          center={[13.9357696, 121.6128612]}
          zoom={13.3}
          scrollWheelZoom
          className="w-full h-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {rentals.map((data) => (
            <Marker
              key={data.slug_name}
              position={[data.lat, data.long]}
              icon={priceIcon(data.price)}
              eventHandlers={{
                click: () => handleMarkerClick(data.slug_name),
              }}
            />
          ))}
        </MapContainer>

        {/* CARD */}
        {selectedRental && (
          <div
            ref={cardRef}
            className={`
              absolute bottom-5 right-5 w-80 bg-white shadow-xl rounded-xl p-4 z-[9999]
              transition-all duration-300 ease-out
              ${showCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}
            `}
            onClick={() => navigate(`/room/${selectedRental.slug_name}`)}
          >
            <img
              src={selectedRental.room_picture}
              alt={selectedRental.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="font-bold text-lg">{selectedRental.name}</h2>
            <p className="text-sm text-gray-600">{selectedRental.address}</p>
            <p className="font-semibold mt-1">${selectedRental.price}/month</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default LiveMapView;
