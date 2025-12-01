import { useEffect } from "react";
import Sidebar from "src/components/SideBar";
import { useDashboard } from "src/store/useDashboard";
import Pagination from "src/components/PaginationButton";

// Icons
import { Home, MapPin, Edit, Eye, PlusCircle, FolderOpen, House } from "lucide-react";

const LandLordProperties = () => {
    const { dashboardData, fetchDashboardData } = useDashboard();

    const properties = dashboardData?.your_properties?.results ?? [];
    const count = dashboardData?.your_properties?.count ?? 0;

    const limit = 4;
    const totalPages = Math.ceil(count / limit);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handlePageChange = (pageNumber) => {
        fetchDashboardData(pageNumber);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 space-y-10">
                
                {/* Header */}
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">My Properties</h1>
                        <p className="text-gray-600">Manage and track your property listings</p>
                    </div>

                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
                        <PlusCircle className="w-5 h-5" />
                        Add Property
                    </button>
                </header>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Empty State */}
                    {properties.length === 0 && (
                        <div className="col-span-full flex flex-col items-center py-20 bg-white rounded-xl shadow">
                            <House className="w-20 h-20 text-gray-400 mb-4" />
                            <h2 className="text-xl font-semibold text-gray-800">No properties yet</h2>
                            <p className="text-gray-500 mt-1 text-center max-w-md">
                                You haven’t added any properties. Start by adding your first listing to showcase
                                your rooms and begin managing tenants efficiently.
                            </p>
                        </div>
                    )}

                    {/* Property Cards */}
                    {properties.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow p-4">
                            
                            {/* Thumbnail */}
                            <img
                                src={item.room_picture}
                                alt={item.name}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />

                            {/* Room Name */}
                            <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>

                            {/* Status */}
                            <p className="text-sm flex items-center gap-2 text-gray-600 mt-2">
                                <Home className="w-4 h-4 text-gray-500" />
                                Status: 
                                <span
                                    className={
                                        item.room_availability === "Available"
                                            ? "text-green-600 font-medium"
                                            : "text-red-600 font-medium"
                                    }
                                >
                                    {item.room_availability}
                                </span>
                            </p>

                            {/* Address */}
                            <p className="text-sm flex items-center gap-2 text-gray-600 mt-1">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                {item.address}
                            </p>

                            {/* Actions */}
                            <div className="flex items-center gap-3 mt-4">
                                <button className="flex items-center gap-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>

                                <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                                    <Eye className="w-4 h-4" />
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {count > limit && (
                    <div className="mt-6">
                        <Pagination
                            count={totalPages}
                            limit={limit}
                            page={dashboardData.page || 1}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandLordProperties;
