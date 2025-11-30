import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const RoomMap = ({ name, lat, long }) => {

    const HomePin = () =>
        L.divIcon({
            html: `
                <div class="relative flex flex-col items-center">
                    
                    <div class="bg-indigo-600 rounded-full w-10 h-10 flex items-center justify-center 
                                shadow-xl border-2 border-white transform transition duration-200 hover:scale-110">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                    </div>
                    
                    <div class="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-indigo-600 -mt-1 shadow-md"></div>
                </div>
            `,
            className: "", // Empty className is important for the Tailwind HTML to work
            iconSize: [48, 55],
            iconAnchor: [24, 55],
        });

    return (
        <MapContainer
            center={[lat || 13.9357696, long || 121.6128612]}
            zoom={15}
            scrollWheelZoom
            className="w-full h-full"
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {lat && long && (
                <Marker key={name} position={[lat, long]} icon={HomePin()}/>
            )}
        </MapContainer>
    );
};

export default RoomMap;
