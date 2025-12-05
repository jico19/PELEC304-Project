import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WorkInProgress() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 px-4 text-center space-y-6">

            {/* Cute Cat GIF */}
            <div className="w-48 h-48">
                <img
                    src="https://media.tenor.com/M-ibWYQzmiIAAAAM/cat-cute.gif"
                    alt="cat_cute"
                    className="rounded-xl shadow-lg object-cover w-full h-full"
                />
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-extrabold text-gray-800">
                LCBNB Feature Coming Soon
            </h1>

            {/* Description */}
            <p className="text-gray-600 max-w-md">
                We’re cooking something awesome for LCBNB! Hang tight while we get it ready.
            </p>

            {/* Button */}
            <button
                onClick={() => navigate(-1)}
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center space-x-2"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
            </button>
        </div>
    );
}
