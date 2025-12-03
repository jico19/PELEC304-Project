import Sidebar from "src/components/SideBar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, DollarSign, Info, Layers, Wifi, Bath, Snowflake } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "src/utils/Api";

const PropertyView = () => {
    const navigate = useNavigate();
    const { slug_name } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await api.get(`room/${slug_name}/`);
                setTimeout(() => setRoom(res.data), 1000);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRoom();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <main className="flex-1 p-10">

                {/* Header */}
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        {room ? room.name : "Loading..."}
                    </h1>

                    <p className="text-gray-500 mb-4">Property Details</p>

                    <button
                        type="button"
                        onClick={() => navigate("/landlord/properties")}
                        className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 
                       font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                    >
                        <ArrowLeft size={16} />
                        Go back
                    </button>
                </header>

                {!room ? (
                    <div className="text-gray-600 text-lg">Loading property...</div>
                ) : (
                    <div className="space-y-8">

                        {/* IMAGE */}
                        <div>
                            <img
                                src={room.room_picture}
                                alt={room.name}
                                className="w-full h-80 object-cover rounded-xl shadow"
                            />
                        </div>

                        {/* LOCATION + PRICE CARD */}
                        <div className="bg-white p-6 rounded-xl shadow space-y-6">

                            {/* Location */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
                                    <MapPin className="text-red-500" size={18} />
                                    Location
                                </h2>
                                <p className="text-gray-600">{room.address}</p>
                            </div>

                            {/* Price */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
                                    <DollarSign className="text-green-600" size={18} />
                                    Price
                                </h2>
                                <p className="text-gray-700 font-bold text-xl">
                                    ₱{room.price}
                                </p>
                            </div>

                        </div>

                        {/* DESCRIPTION */}
                        <section className="bg-white p-6 rounded-xl shadow">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                <Info className="text-blue-600" size={18} />
                                Description
                            </h2>

                            <p className="text-gray-600 leading-relaxed">
                                {room.description}
                            </p>
                        </section>
                        
                        <section className="bg-white p-6 rounded-xl shadow">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Layers className="text-purple-600" size={18} />
                                Amenities & Features
                            </h2>

                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-center gap-3">
                                    <Wifi className="text-blue-500" size={18} />
                                    Internet: {room.internet ? "Yes" : "No"}
                                </li>

                                <li className="flex items-center gap-3">
                                    <Bath className="text-gray-600" size={18} />
                                    Comfort Room: {room.comfort_room ? "Yes" : "No"}
                                </li>

                                <li className="flex items-center gap-3">
                                    <Snowflake className="text-cyan-500" size={18} />
                                    Air Conditioning: {room.air_condition ? "Yes" : "No"}
                                </li>
                            </ul>
                        </section>


                        {/* ACTION BUTTONS */}
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => navigate("/landlord/properties")}
                                className="bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-400 transition"
                            >
                                Back to Properties
                            </button>

                            <button
                                onClick={() => navigate(`/landlord/properties/edit/${room.slug_name}`)}
                                className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                            >
                                Edit Property
                            </button>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
};

export default PropertyView;
