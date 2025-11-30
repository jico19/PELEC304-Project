import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import { useParams } from "react-router-dom";
import api from "src/utils/Api";
import { useEffect, useState } from "react";
import { MapPinIcon, Calendar } from "lucide-react";
import { useProfile } from "src/store/useProfile";
import { useToast } from "src/store/useToast";
import toast from "react-hot-toast";

const RoomDetailPage = () => {
    const { slug_name } = useParams();
    const [room, setRoom] = useState(null);
    const { profile, fetchUserProfile } = useProfile()
    const [change, setChange] = useState(false)
    const { success, error, loading } = useToast();

    // if user has one it cannot rent anymore must have yknow delete the rent or move out to rent a new.

    const RentHandler = async () => {
        try {
            await toast.promise(
                new Promise(async (resolve, reject) => {
                    try {
                        const response = await api.post('transaction/', {
                            room: room.id
                        });

                        // optional: delay a bit to let user see "Processing..."
                        setTimeout(() => resolve(response), 1050); // 0.8s delay

                    } catch (err) {
                        reject(err);
                    }
                }),
                {
                    loading: `Processing rental for ${room.name}...`,
                    success: `Successfully rented ${room.name}! Enjoy your stay.`,
                    error: (err) => `Failed to rent ${room.name}: ${err.response?.data?.detail || "Please try again."}`
                }
            );

            setChange(true);
        } catch (err) {
            console.log(err.response?.data);
            toast.error(err.response?.data?.detail || "Something went wrong.");
        }
    };

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await api.get(`room/${slug_name}/`);
                setTimeout(() => setRoom(res.data), 2000); // simulate delay
            } catch (err) {
                console.log(err);
            }
        };
        fetchRoom();
    }, [slug_name, change]);

    const amenities = room ? [
        room.air_condition && "Air Conditioning",
        room.comfort_room && "Comfort Room",
        room.internet && "Internet"
    ].filter(Boolean) : [];

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50">
            <NavBar />
            <main className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-6">
                    {/* Image */}
                    {room ? (
                        <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={room.room_picture}
                                alt={room.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-96 bg-gray-300 rounded-xl animate-pulse"></div>
                    )}

                    {/* Info Card */}
                    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                        {room ? (
                            <>
                                <h1 className="text-3xl font-bold">{room.name}</h1>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPinIcon className="w-5 h-5 text-red-500" />
                                    <p>{room.address}</p>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {amenities.map((a) => (
                                        <span key={a} className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                                            {a}
                                        </span>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Title Skeleton */}
                                <div className="h-12 w-3/4 bg-gray-300 rounded-md animate-pulse"></div>

                                {/* Address Skeleton */}
                                <div className="h-6 w-1/2 bg-gray-200 rounded-md animate-pulse mt-2"></div>

                                {/* Amenities Skeleton */}
                                <div className="flex flex-wrap gap-3 mt-6">
                                    <div className="h-8 w-28 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* About Section */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        {room ? (
                            <>
                                <h2 className="text-xl font-semibold mb-2">About this room</h2>
                                <p className="text-gray-700">{room.description}</p>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <div className="h-6 w-1/4 bg-gray-300 rounded-md animate-pulse"></div>
                                <div className="h-32 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div>
                    <div className="sticky top-24 bg-white p-6 rounded-xl shadow-md space-y-4">
                        {room ? (
                            <>
                                <div className="text-4xl font-bold text-green-600">${room.price}</div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        Available:{" "}
                                        <span className={room.room_availability === "Available" ? "text-green-600" : "text-red-600"}>
                                            {room.room_availability}
                                        </span>
                                    </span>
                                </div>
                                <div className="text-gray-800 font-medium">Owner: {room.owner_name}</div>
                                <button
                                    disabled={room.room_availability !== 'Available'}
                                    onClick={RentHandler}
                                    className={`w-full mt-4 font-semibold py-2 rounded-lg
        ${room.room_availability === 'Available'
                                            ? 'bg-green-600 text-white hover:opacity-90'
                                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                        }`}
                                >
                                    Rent
                                </button>

                            </>
                        ) : (
                            <>
                                <div className="h-10 w-1/2 bg-gray-300 rounded-md animate-pulse"></div>
                                <div className="h-4 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
                                <div className="h-6 w-full bg-gray-200 rounded-md animate-pulse"></div>
                                <div className="h-10 w-full bg-gray-300 rounded-lg animate-pulse"></div>
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RoomDetailPage;
