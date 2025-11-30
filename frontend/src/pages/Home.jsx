import { useState, useEffect } from "react";
import api from "src/utils/api";
import NavBar from "src/components/NavBar";
import PropertyCards from "src/components/PropertyCards";
import { Search } from "lucide-react";
import Footer from "src/components/Footer";
import Pagination from "src/components/PaginationButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLocation from "src/store/useLocation";
import { get } from "react-hook-form";

const Home = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("")
    const [rentals, setRentals] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true); // loading state
    const limit = 8;
    const { location, error, getLocation } = useLocation()



    const fetchRooms = async (pageNumber = 1, isSearch = false) => {
        setLoading(true);
        try {
            const offset = (pageNumber - 1) * limit;
            let res;

            if (isSearch && query) {
                res = await axios.post(
                    `http://127.0.0.1:8000/api/room/search/?limit=${limit}&offset=${offset}`,
                    { address: query }
                );
            } else {
                res = await api.get(`room/?limit=${limit}&offset=${offset}`);
            }

            setRentals(res.data.results);
            setCount(res.data.count);
            setPage(pageNumber);
            console.log(res.data)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLocation()
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query) {
                fetchRooms(1, true); // page 1, search mode
            } else {
                fetchRooms(1, false); // reset to normal
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [query]);

    const RentNowHandler = async (slug_name) => {
        navigate(`/room/${slug_name}`);
    };

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50">
            <NavBar />

            <main className="flex-1 mt-20 px-4">
                <div className="container mx-auto py-8 max-w-[1400px]">
                    {/* Header & Search stacked */}
                    <div className="flex flex-col gap-6 mb-8">
                        <div className="text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                                Find Your Perfect Room
                            </h1>
                            <p className="text-gray-600 text-base sm:text-lg mt-2">
                                One renter at a time
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by location or room type..."
                                    className="pl-12 h-14 w-full text-lg border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Rooms Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {loading ? (
                            Array.from({ length: limit }).map((_, i) => (
                                <div
                                    key={i}
                                    className="animate-pulse flex flex-col bg-white rounded-xl shadow-md p-4 gap-2 border border-gray-200 h-72"
                                >
                                    <div className="bg-gray-300 h-36 w-full rounded-lg" />
                                    <div className="h-4 bg-gray-300 rounded w-3/4 mt-2" />
                                    <div className="h-3 bg-gray-300 rounded w-1/2 mt-1" />
                                    <div className="h-4 bg-gray-300 rounded w-1/4 mt-auto" />
                                </div>
                            ))
                        ) : rentals.length > 0 ? (
                            rentals.map((data) => (
                                <PropertyCards
                                    key={data.room_id}
                                    image={data.room_picture}
                                    name={data.name}
                                    address={data.address}
                                    aircon={data.air_condition}
                                    comfortroom={data.comfort_room}
                                    internet={data.internet}
                                    price={data.price}
                                    handler={() => RentNowHandler(data.slug_name)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                <p className="text-xl font-semibold">
                                    No results found for "{query}"
                                </p>
                                <p className="mt-2">Try adjusting your search or check back later.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {!loading && (
                        <div className="flex justify-end mt-8">
                            <Pagination
                                count={count}
                                limit={limit}
                                page={page}
                                onPageChange={(pageNumber) => fetchRooms(pageNumber, !!query)}
                            />
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
