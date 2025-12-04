import Sidebar from "src/components/SideBar"
import { useNavigate, useParams } from "react-router-dom"
import { Image, Home, DollarSign, MapPin, Info, Wifi, Coffee, Airplay, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react"
import api from "src/utils/Api"
import AmenitiesToggle from "src/components/AmenitiesToggle";
import { useToast } from "src/store/useToast";
import toast from "react-hot-toast";

const PropertyEdit = () => {
    const navigate = useNavigate()
    const { success, error } = useToast()
    const { slug_name } = useParams();
    const [propertyImage, setImage] = useState(null);
    const [propertyName, setPropertyName] = useState("");
    const [price, setPrice] = useState("");
    const [Address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [internet, setInternet] = useState(false);
    const [comfortRoom, setComfortRoom] = useState(false);
    const [aircon, setAircon] = useState(false);
    const [latLng, setLatLng] = useState(null);
    const [availability, setAvailability] = useState("");


    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await api.get(`room/${slug_name}/`);
                console.log(res.data)
                setImage(res.data.room_picture)
                setPropertyName(res.data.name)
                setPrice(res.data.price)
                setAddress(res.data.address)
                setDescription(res.data.description)
                setInternet(res.data.internet)
                setComfortRoom(res.data.comfort_room)
                setAircon(res.data.air_condition)
                setAvailability(res.data.room_availability)
            } catch (err) {
                console.log(err);
            }
        };
        fetchRoom();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        if (propertyImage && propertyImage instanceof File) {
            formData.append("room_picture", propertyImage);
        }
        formData.append("name", propertyName)
        formData.append("price", price)
        formData.append("address", Address)
        formData.append("description", description)
        formData.append("room_availability", availability)
        formData.append("internet", internet)
        formData.append("comfort_room", comfortRoom)
        formData.append("air_condition", aircon)
        try {

            await toast.promise(
                api.patch(`room/${slug_name}/`, formData), {
                loading: "Processing your update.",
                success: "Your property is updated successfully.",
                error: "Failed to update your Property."
                }
            )

            navigate('/landlord/properties', { state: { refresh: true } });
            success("Successfully updated.")
        } catch (err) {
            console.log(err)
            error("There's something wrong in updating your data please try again.")
        }
    }


    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-10">
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Edit Property
                    </h1>

                    <p className="text-gray-500 mb-4">
                        Update your property details, availability, and pricing.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                    >
                        <ArrowLeft size={16} />
                        Go back
                    </button>
                </header>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {propertyImage && (
                        <img
                            src={
                                typeof propertyImage === "string"
                                    ? propertyImage // existing URL from backend
                                    : URL.createObjectURL(propertyImage) // new upload preview
                            }
                            alt="Property Preview"
                            className="w-full h-100 object-cover rounded-lg border"
                        />
                    )}
                    {/* Inputs */}
                    {[
                        {
                            label: "Property Photo",
                            icon: Image,
                            value: propertyImage,
                            type: "file",
                            onChange: (e) => setImage(e.target.files[0]),
                        },
                        {
                            label: "Property Name",
                            icon: Home,
                            type: "text",
                            value: propertyName,
                            onChange: (e) => setPropertyName(e.target.value),
                            placeholder: "Property name"
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
                            value: Address,
                            onChange: (e) => setAddress(e.target.value),
                            placeholder: "Address"
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
                    <div className="flex items-center gap-3">
                        <Home size={20} className="text-gray-400" />
                        <label className="font-semibold text-gray-700">Availability:</label>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setAvailability("Available")}
                                className={`px-4 py-2 rounded-lg border ${availability === "Available"
                                    ? "bg-green-500 text-white border-green-500"
                                    : "bg-white text-gray-700 border-gray-300"
                                    }`}
                            >
                                Available
                            </button>
                            <button
                                type="button"
                                onClick={() => setAvailability("Not Available")}
                                className={`px-4 py-2 rounded-lg border ${availability === "Not Available"
                                    ? "bg-red-500 text-white border-red-500"
                                    : "bg-white text-gray-700 border-gray-300"
                                    }`}
                            >
                                Not Available
                            </button>
                        </div>
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
                            Confirm Edit
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                            onClick={() => navigate(-1)}
                        >
                            Cancel Edit
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default PropertyEdit