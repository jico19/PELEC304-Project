import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import { useParams } from "react-router-dom";
import api from "src/utils/Api";
import { useEffect, useState } from "react";
import { MapPinIcon, Calendar, Users } from "lucide-react";

const RoomDetailPage = () => {
    const { slug_name } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await api.get(`room/${slug_name}/`);
                // simulate 3-second delay
                setTimeout(() => {
                    setRoom(res.data);
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRoom();
    }, [slug_name]);

    if (!room)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-500">Loading...</p>
            </div>
        );
    // Build amenities list
    const amenities = [];
    if (room.air_condition) amenities.push("Air Conditioning");
    if (room.comfort_room) amenities.push("Comfort Room");
    if (room.internet) amenities.push("Internet");

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50">
            <NavBar />

            <main className="max-w-6xl mx-auto px-4 py-6">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Room Image */}
                        <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={room.room_picture}
                                alt={room.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Basic Info */}
                        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                            <h1 className="text-3xl font-bold">{room.name}</h1>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPinIcon className="w-5 h-5 text-red-500" />
                                <p>{room.address}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {amenities.map((amenity) => (
                                    <span
                                        key={amenity}
                                        className="bg-gray-100 px-3 py-1 rounded-full text-gray-700"
                                    >
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-xl font-semibold mb-2">About this room</h2>
                            <p className="text-gray-700">{room.description}</p>
                        </div>
                    </div>

                    {/* Right Column - Sticky Info */}
                    <div>
                        <div className="sticky top-24 bg-white p-6 rounded-xl shadow-md space-y-6">
                            <div className="text-4xl font-bold text-green-600">
                                ${room.price}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    Available:{" "}
                                    <span
                                        className={
                                            room.room_availability === "Available"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }
                                    >
                                        {room.room_availability}
                                    </span>
                                </span>
                            </div>

                            <div className="text-gray-800 font-medium">Owner: {room.owner_name}</div>

                            <button className="w-full mt-4 bg-green-600 text-white font-semibold py-2 rounded-lg hover:opacity-90">
                                Rent
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RoomDetailPage;
