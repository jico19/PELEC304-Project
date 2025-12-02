import Sidebar from "src/components/SideBar";
import { Image, Home, DollarSign, MapPin, Info, Wifi, Coffee, Airplay, X } from "lucide-react";
import { useState } from "react";
import api from "src/utils/Api";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import AmenitiesToggle from "src/components/AmenitiesToggle";

const AddProperty = () => {
    const [image, setImage] = useState(null);
    const [propertyName, setPropertyName] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [internet, setInternet] = useState(false);
    const [comfortRoom, setComfortRoom] = useState(false);
    const [aircon, setAircon] = useState(false);
    const [latLng, setLatLng] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("room_picture", image);
        formData.append("name", propertyName);
        formData.append("price", price);
        formData.append("address", address);
        formData.append("description", description);
        formData.append("internet", internet);
        formData.append("comfortRoom", comfortRoom);
        formData.append("aircon", aircon);
        formData.append("lat", latLng.lat)
        formData.append("long", latLng.lng)

        try {
            const res = await api.post("room/", formData);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const MapPicker = ({ latLng, setLatLng }) => {
        useMapEvents({
            click(e) {
                setLatLng(e.latlng);
                console.log(e.latlng)
            },
        });

        return latLng ? <Marker position={latLng} /> : null;
    };

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });


    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-10">
                {/* Header */}
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Add New Property</h1>
                    <p className="text-gray-500">Fill in the details below to list your property.</p>
                </header>

                {/* Form Card */}
                <div className="bg-white shadow-lg rounded-xl p-8 max-w-5xl mx-auto space-y-8">
                    {/* Property Info */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
                            <Home size={24} /> Property Details
                        </h2>

                        {/* Map Picker */}
                        <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                            <MapContainer
                                center={[13.935545841327885, 121.61334598811892]}
                                zoom={13}
                                style={{ height: "400px", width: "100%" }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution="&copy; OpenStreetMap contributors"
                                />
                                <MapPicker latLng={latLng} setLatLng={setLatLng} />
                            </MapContainer>
                        </div>
                        {latLng && (
                            <p className="text-gray-700 mt-2">
                                <strong>Coordinates:</strong> {latLng.lat.toFixed(5)}, {latLng.lng.toFixed(5)}
                            </p>
                        )}
                    </section>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Inputs */}
                        {[
                            {
                                label: "Property Photo",
                                icon: Image,
                                type: "file",
                                onChange: (e) => setImage(e.target.files[0]),
                            },
                            {
                                label: "Property Name",
                                icon: Home,
                                type: "text",
                                value: propertyName,
                                onChange: (e) => setPropertyName(e.target.value),
                            },
                            {
                                label: "Price",
                                icon: DollarSign,
                                type: "text",
                                value: price,
                                onChange: (e) => setPrice(e.target.value),
                                placeholder: "e.g. $2500",
                            },
                            {
                                label: "Address",
                                icon: MapPin,
                                type: "text",
                                value: address,
                                onChange: (e) => setAddress(e.target.value),
                            },
                        ].map(({ icon: Icon, type, ...props }, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <Icon size={20} className="text-gray-400" />
                                {type === "file" ? (
                                    <input
                                        type="file"
                                        onChange={props.onChange} // no value here!
                                        className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                ) : (
                                    <input
                                        type={type}
                                        {...props}
                                        className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                )}
                            </div>
                        ))}
                        {/* Description */}
                        <div className="flex items-start gap-3">
                            <Info size={20} className="text-gray-400 mt-2" />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                rows={4}
                            />
                        </div>

                        {/* Amenities */}
                        <div>
                            <h3 className="font-semibold mb-2 text-gray-700">Amenities</h3>
                            <div className="flex flex-wrap gap-3">
                                <AmenitiesToggle label="Internet" Icon={Wifi} active={internet} setActive={setInternet} />
                                <AmenitiesToggle label="Comfort Room" Icon={Coffee} active={comfortRoom} setActive={setComfortRoom} />
                                <AmenitiesToggle label="Air Condition" Icon={Airplay} active={aircon} setActive={setAircon} />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                            <button
                                type="submit"
                                className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                            >
                                Add Property
                            </button>
                            <button
                                type="button"
                                className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
                            >
                                <X size={16} /> Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};


export default AddProperty
