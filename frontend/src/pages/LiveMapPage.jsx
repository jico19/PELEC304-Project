import { useState, useEffect } from "react";
import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import api from "src/utils/Api";
import green_dot from "../assets/green-dot.png";
import yellow_dot from "../assets/yellow-dot.png";
import red_dot from "../assets/red-dot.png";

const LiveMapView = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const caller = async () => {
      try {
        const res = await api.get("room/locations/");
        setRentals(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    caller();
  }, []);

  return (
    <div className="w-full flex flex-col bg-white">
      <NavBar />
      <div className="relative h-screen flex justify-center items-center">
        <div className="flex mt-20 mb-10  w-full md:w-8/9 h-8/9 rounded-2xl shadow-xl overflow-hidden z-0">
          <div className="fixed top-2.5 left-21 z-1000 ">
            <button
              onClick={() => {
                // Add your filter logic here
                alert("Filter clicked!");
              }}
              className="btn bg-white border-2 border-gray-300 p-2"
            >
              <img src="https://img.icons8.com/?size=100&id=3720&format=png&color=000000" alt="filter" className="w-4 h-4" />
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
              const markerIcon =
                data.price <= 3000
                  ? new L.icon({ iconUrl: green_dot, iconSize: [32] })
                  : data.price <= 7000
                  ? new L.icon({ iconUrl: yellow_dot, iconSize: [32] })
                  : new L.icon({ iconUrl: red_dot, iconSize: [32] });

              return (
                <Marker
                  key={data.room_id}
                  position={[data.lat, data.long]}
                  icon={markerIcon}
                >
                  <Popup>
                    <h1>Apartment name: {data.name}</h1>
                    <p>Price:{data.price}</p>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LiveMapView;
