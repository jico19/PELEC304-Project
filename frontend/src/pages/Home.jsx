import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NavBar from "src/components/NavBar";
import PropertyCards from "src/components/PropertyCards";
import Footer from "src/components/Footer";
import Pagination from "src/components/PaginationButton";
import { Search } from "lucide-react";
import { useRole } from "src/store/useRole";
import { fetchRoom } from "src/apis/roomQuery";

const Home = () => {
    const navigate = useNavigate();
    const { role, fetchRole } = useRole();

    const [redirecting, setRedirecting] = useState(false);
    const [redirectDone, setRedirectDone] = useState(false);

    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const [page, setPage] = useState(1);
    const limit = 8;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query);
            setPage(1); 
        }, 800);

        return () => clearTimeout(timeout);
    }, [query]);


    useEffect(() => {
        const initRole = async () => {
            await fetchRole();
            console.log("tite")
        };
        initRole();
    }, [fetchRole, role]);


    useEffect(() => {
        if (!role || redirectDone) return;

        setRedirecting(true);

        const timeout = setTimeout(() => {
            if (role === "Landlord") navigate("/landlord/dashboard");
            else if (role === "SuperAdmin") navigate("/admin/dashboard");
            else if (role === "Tenant") navigate("/home");

            setRedirecting(false);
            setRedirectDone(true);
        }, 400);

        return () => clearTimeout(timeout);
    }, [role, redirectDone, navigate]);

    const { data, isLoading } = useQuery({
        queryKey: ["rooms", page, debouncedQuery],
        queryFn: () => fetchRoom({ page, limit, query: debouncedQuery }),
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5, // cache 5 minutes
    });

    const totalRooms = data?.count || 0;
    const rooms = data?.results || [];


    if (redirecting) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                    <p className="text-lg font-medium text-gray-700">Redirecting...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50">
            <NavBar />

            <main className="flex-1 mt-20 px-4">
                <div className="container mx-auto py-8 max-w-[1400px]">
                    {/* Header & Search */}
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
                        {isLoading
                            ? Array.from({ length: limit }).map((_, i) => (
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
                            : rooms.length > 0
                                ? rooms.map((room) => (
                                    <PropertyCards
                                        key={room.room_id}
                                        image={room.room_picture}
                                        name={room.name}
                                        address={room.address}
                                        aircon={room.air_condition}
                                        comfortroom={room.comfort_room}
                                        internet={room.internet}
                                        price={room.price}
                                        handler={() => navigate(`/room/${room.slug_name}`)}
                                    />
                                ))
                                : (
                                    <div className="col-span-full text-center py-20 text-gray-500">
                                        <p className="text-xl font-semibold">
                                            No results found for "{debouncedQuery}"
                                        </p>
                                        <p className="mt-2">Try adjusting your search or check back later.</p>
                                    </div>
                                )}
                    </div>

                    {/* Pagination */}
                    {rooms.length > 0 && (
                        <div className="flex justify-end mt-8">
                            <Pagination
                                count={totalRooms}
                                limit={limit}
                                page={page}
                                onPageChange={(p) => setPage(p)}
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
