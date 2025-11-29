import { useState, useEffect } from "react";
import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import { ImgRoomCard } from "src/components/RoomCard";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import green_dot from "../assets/green-dot.png";
import yellow_dot from "../assets/yellow-dot.png";
import red_dot from "../assets/red-dot.png";
import { useLocation } from "react-router-dom";

const LiveMapView = () => {
  const [rentals, setRentals] = useState([]);
  const location = useLocation()


  useEffect(() => {
    // Catch actual thrown errors from Leaflet
    const handleError = (event) => {
      if (
        event.error &&
        event.error.message &&
        event.error.message.includes('Invalid LatLng object')
      ) {
        event.preventDefault();
        event.stopPropagation();
        return true;
      }
    };

    window.addEventListener('error', handleError, true);

    const caller = async () => {
      if (location.state) {
        console.log("Using rentals from navigation state");
        setRentals(location.state);
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/api/room/locations/");
        const validRentals = res.data.data
          .map(item => ({
            ...item,
            lat: parseFloat(item.lat),
            long: parseFloat(item.long)
          }))
          .filter(item => !isNaN(item.lat) && !isNaN(item.long));

        setRentals(validRentals);
      } catch (error) {
        console.log(error);
      }
    };

    caller();

    return () => {
      window.removeEventListener('error', handleError, true);
    };
  }, [location.state]);

  // custom icon


  const priceIcon = (price) =>
    L.divIcon({
      html: `
      <div class="
        flex items-center justify-center
        text-xs font-bold text-white
        bg-red-500 rounded-full
        border-2 border-white
        shadow
        w-10 h-10
      ">
        $${price}
      </div>
    `,
      className: "",
      iconSize: [32, 32],    // smaller circle
      iconAnchor: [16, 32],  // bottom-center anchor
    });

  return (
    <div className="w-full flex flex-col bg-white">
      <NavBar />
      <div className="relative h-screen flex justify-center items-center">
        <div className="flex flex-col mt-20 mb-10 w-full md:w-8/9 h-8/9 rounded-2xl shadow-xl overflow-hidden z-0">
          <div className="fixed top-2.5 left-21 z-1000 ">
            <button
              onClick={() => {
                // Add your filter logic here
                alert("Filter clicked!");
              }}
              className="btn bg-white border-2 border-gray-300 p-2"
            >
              <img
                src="https://img.icons8.com/?size=100&id=3720&format=png&color=000000"
                alt="filter"
                className="w-4 h-4"
              />
            </button>
          </div>
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


          {/* <div className="w-4/5 h-1/5 bg-red-600 absolute self-center bottom-50 z-100"></div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LiveMapView;
