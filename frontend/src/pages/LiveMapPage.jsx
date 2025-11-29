import { useState, useEffect } from "react";
import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import { ModalCard } from "src/components/RoomCard";
import Filter from "src/components/Filter";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import green_dot from "../assets/green-dot.png";
import yellow_dot from "../assets/yellow-dot.png";
import red_dot from "../assets/red-dot.png";
import { useLocation } from "react-router-dom";

const LiveMapView = () => {
  const [search, setSearch] = useState("")
  const [rentals, setRentals] = useState([]);
  const [selectedRental, setSelectedRental] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Catch actual thrown errors from Leaflet
    const handleError = (event) => {
      if (
        event.error &&
        event.error.message &&
        event.error.message.includes("Invalid LatLng object")
      ) {
        event.preventDefault();
        event.stopPropagation();
        return true;
      }
    };

    window.addEventListener("error", handleError, true);

    const caller = async () => {
      if (location.state) {
        console.log("Using rentals from navigation state");
        setRentals(location.state);
        return;
      }

      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/room/locations/"
        );
        console.log(res.data.data);
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

    caller();

    return () => {
      window.removeEventListener("error", handleError, true);
    };
  }, [location.state]);

  const handleMarkerClick = (rental) => {
    setSelectedRental(rental);
  };

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

  // custom icon

  const priceIcon = (price) =>
    L.divIcon({
      html: `
      <div class="
        flex items-center justify-center
        text-xs font-bold text-white
        bg-red-400 rounded-full
        border-2 border-white
        shadow
        w-10 h-10
      ">
        ₱${price}
      </div>
    `,
      className: "",
      iconSize: [32, 32], // smaller circle
      iconAnchor: [16, 32], // bottom-center anchor
    });

  return (
    <div className="w-full flex flex-col bg-white ">
      <NavBar />
      <div className="relative h-screen flex justify-center items-center animate-fadeIn">
        <Filter />

        <div className="flex flex-col mt-25 mb-10 w-full md:w-8/9 h-8/9 rounded-2xl shadow-xl overflow-hidden z-0 ">
          <MapContainer
            center={[13.9357696, 121.6128612]} // <- lucena city lat and lon
            zoom={13.3} // <- zoom sweet spot sinulat ni jerwin to!
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {rentals.map((data) => {
              return (
                <Marker
                  key={data.room_id}
                  position={[data.lat, data.long]} // <- no parseFloat here anymore
                  icon={priceIcon(data.price)}
                  eventHandlers={{
                    click: () => {
                      handleMarkerClick(data);
                      console.log(data);
                    },
                  }}
                >
                  <Popup autoPan={false}>
                    <h1>Apartment name: {data.name}</h1>
                    <p>Price: {data.price}</p>
                    <p>address: {data.address}</p>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Selected rental details panel (shows when a marker is clicked) */}
        {selectedRental && (
          <div className="absolute bottom-3 md:right-6 md:w-2/5 lg: xl:w-1/5 z-50 w-full bg-white rounded-lg shadow-lg p-4">
            <ModalCard
              key={selectedRental.room_id}
              name={selectedRental.name}
              address={selectedRental.address}
              availability={selectedRental.room_availability}
              price={selectedRental.price}
              dataID={selectedRental.id}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LiveMapView;
