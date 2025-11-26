    import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
    import 'leaflet/dist/leaflet.css'

const LiveMap = () => {
    return (
        <MapContainer 
            center={[13.946443, 121.591338]} 
            zoom={13} 
            scrollWheelZoom={false} 
            style={{ height: "100vh", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[13.946443, 121.591338]}>
                <Popup>

                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default LiveMap
