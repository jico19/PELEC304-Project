import NavBar from 'src/components/NavBar'
import Footer from 'src/components/Footer'
import { useState, useEffect } from 'react'
import useLocation from 'src/store/useLocation'
import axios from 'axios'
import PropertyCards from "src/components/PropertyCards";
import { useNavigate } from 'react-router-dom'
import { MapPin, DollarSign, RefreshCw } from 'lucide-react'
import Pagination from 'src/components/PaginationButton'

const Recomendataions = () => {
    const { location } = useLocation()
    const [radius, setRadius] = useState(5)
    const [budget, setBudget] = useState([1000, 5000])
    const [recomendedRooms, setRecomendedRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(1)
    const limit = 8
    const navigate = useNavigate()

    const fetchRooms = async (pageNumber = 1) => {
        if (!location) return
        setLoading(true)
        try {
            const res = await axios.get(
                `http://127.0.0.1:8000/api/rooms/?lat=${location.lat}&lon=${location.long}&radius=${radius}&min-budget=${budget[0]}&max-budget=${budget[1]}&page=${pageNumber}`
            )
            setRecomendedRooms(res.data.results)
            setCount(res.data.count)
            setPage(pageNumber)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    
    const handleRefresh = () => {
        setRadius(5)
        setBudget([1000, 5000])
        fetchRooms(1)
    }

    useEffect(() => {
        if (!location) return
        fetchRooms(1)
    }, [location, radius, budget])

    const RentNowHandler = (slug_name) => navigate(`/room/${slug_name}`)

    const distanceOptions = [
        { label: "1-5 km", value: 5, icon: <MapPin size={16} /> },
        { label: "6-10 km", value: 10, icon: <MapPin size={16} /> },
        { label: "11-20 km", value: 20, icon: <MapPin size={16} /> },
    ]

    const budgetOptions = [
        { label: "₱1,000 - ₱5,000", value: [1000, 5000], icon: <DollarSign size={16} /> },
        { label: "₱6,000 - ₱10,000", value: [6000, 10000], icon: <DollarSign size={16} /> },
        { label: "₱11,000+", value: [11000, 1000000], icon: <DollarSign size={16} /> },
    ]

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50">
            <NavBar />

            <main className="flex-1 mt-16 sm:mt-24 px-4 sm:px-6 lg:px-8 py-10">
                {/* header and controls here (same as before) */}



                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Your Perfect Spot Awaits</h1>
                    <p className="text-gray-600 mt-2">Quickly find rooms that match your preferences. Just pick distance and budget.</p>
                </header>

                {/* Controls */}
                <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Filter Your Search</h2>
                        <button
                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => {
                                handleRefresh()
                            }}
                        >
                            <RefreshCw size={16} /> Refresh
                        </button>
                    </div>

                    {/* Distance */}
                    <div className="mb-4">
                        <p className="font-medium mb-2">Distance</p>
                        <div className="flex gap-3 flex-wrap">
                            {distanceOptions.map(opt => (
                                <button
                                    key={opt.label}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${radius === opt.value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    onClick={() => setRadius(opt.value)}
                                >
                                    {opt.icon} {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Budget */}
                    <div>
                        <p className="font-medium mb-2">Budget</p>
                        <div className="flex gap-3 flex-wrap">
                            {budgetOptions.map(opt => (
                                <button
                                    key={opt.label}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${budget[0] === opt.value[0] ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    onClick={() => setBudget(opt.value)}
                                >
                                    {opt.icon} {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mb-4">Top Matches</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading
                        ? Array.from({ length: limit }).map((_, i) => (
                            <div key={i} className="animate-pulse flex flex-col bg-white rounded-xl shadow-md p-4 gap-2 border border-gray-200 h-72">
                                <div className="bg-gray-300 h-36 w-full rounded-lg" />
                                <div className="h-4 bg-gray-300 rounded w-3/4 mt-2" />
                                <div className="h-3 bg-gray-300 rounded w-1/2 mt-1" />
                                <div className="h-4 bg-gray-300 rounded w-1/4 mt-auto" />
                            </div>
                        ))
                        : recomendedRooms.map(data => (
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
                    }
                </div>

                {/* pagination */}
                <Pagination
                    count={count}
                    limit={limit}
                    page={page}
                    onPageChange={(pageNumber) => fetchRooms(pageNumber)}
                />
            </main>

            <Footer />
        </div>
    )
}

export default Recomendataions









