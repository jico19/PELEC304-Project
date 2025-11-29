import { useState } from "react";
import { Droplet, Airplay, Wifi } from "lucide-react";

const PropertyCard = ({ image, name, address, aircon, comfortroom, internet, price, handler }) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 rounded-lg overflow-hidden w-full flex flex-col">
            {/* Image */}
            <figure className="h-48 w-full overflow-hidden relative bg-gray-300">
                {!imgLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gray-300" />
                )}
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    onLoad={() => setImgLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"
                        }`}
                />
            </figure>

            {/* Card Body */}
            <div className="p-4 flex flex-col flex-1 justify-between">
                {/* Title & Address */}
                <div className="mb-3">
                    <h2 className="text-lg font-bold truncate">{name}</h2>
                    <p className="text-sm text-gray-500 truncate">{address}</p>
                </div>

                {/* Amenities */}
                <div className="mt-2">
                    <h3 className="font-semibold text-sm mb-1">Amenities</h3>
                    <div className="flex flex-wrap gap-2 text-xs">
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${aircon ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                            <Droplet className="w-4 h-4" />
                            Aircon
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${comfortroom ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                            <Airplay className="w-4 h-4" />
                            CR
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${internet ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                            <Wifi className="w-4 h-4" />
                            Internet
                        </div>
                    </div>
                </div>

                {/* Price & Button */}
                <div className="flex justify-between items-center mt-4">
                    <span className="font-semibold text-primary text-base">₱{price}/mo</span>
                    <button className="btn btn-sm" onClick={handler}>View</button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
