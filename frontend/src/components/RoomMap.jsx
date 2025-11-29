import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RoomMap = ({ name, lat, long }) => {
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
                <Marker key={name} position={[lat, long]} />
            )}
        </MapContainer>
    );
};

export default RoomMap;
