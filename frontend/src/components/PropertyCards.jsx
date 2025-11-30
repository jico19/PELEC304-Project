import { useState } from "react";
import { MapPin, Thermometer, Bath, Wifi, ArrowRight } from 'lucide-react';

const PropertyCard = ({ image, name, address, aircon, comfortroom, internet, price, handler }) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl 
                transition-all duration-300 transform hover:-translate-y-1 
                border border-gray-100 overflow-hidden w-full flex flex-col">

            {/* Image Container */}
            <figure className="h-52 w-full overflow-hidden relative bg-gray-100">
                {/* Placeholder/Loading State */}
                {!imgLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gray-200" />
                )}
                {/* Actual Image */}
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    onLoad={() => setImgLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"
                        }`}
                />
                {/* Price Overlay Badge (Top Right) */}
                <div className="absolute top-3 right-3 bg-indigo-600 text-white font-bold text-lg px-3 py-1 rounded-lg shadow-md">
                    ₱{price}/mo
                </div>
            </figure>

            {/* Card Body */}
            <div className="p-5 flex flex-col flex-1">

                {/* Title & Address */}
                <div className="mb-4">
                    <h2 className="text-xl font-extrabold text-gray-900 truncate mb-1" title={name}>
                        {name}
                    </h2>
                    <p className="text-sm text-gray-600 truncate flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0" /> {address}
                    </p>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 text-xs mb-4">
                    {/* Aircon */}
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${aircon
                            ? "bg-blue-500 text-white border-blue-600"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}>
                        <Thermometer className="w-4 h-4" /> Aircon
                    </div>
                    {/* Comfort Room */}
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${comfortroom
                            ? "bg-green-500 text-white border-green-600"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}>
                        <Bath className="w-4 h-4" /> CR
                    </div>
                    {/* Internet */}
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${internet
                            ? "bg-yellow-500 text-white border-yellow-600"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}>
                        <Wifi className="w-4 h-4" /> Internet
                    </div>
                </div>

                {/* Action Button */}
                <button
                    className="w-full py-2.5 mt-auto 
                       bg-indigo-600 text-white font-semibold 
                       rounded-lg shadow-md hover:bg-indigo-700 
                       focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 
                       transition duration-150 ease-in-out flex items-center justify-center gap-2"
                    onClick={handler}
                >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default PropertyCard;
