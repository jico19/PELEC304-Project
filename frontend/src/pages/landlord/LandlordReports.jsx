import { Pencil, Trash2, FileWarning, AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import Sidebar from "src/components/SideBar";
import { useDashboard } from "src/store/useDashboard";

const LandLordReport = () => {
    const { dashboardData, fetchDashboardData } = useDashboard();

    const reports = dashboardData?.room_reports ?? [];

    useEffect(() => {
        fetchDashboardData()
    }, [])

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8 space-y-10">

                {/* Header */}
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
                        <p className="text-gray-600">
                            Track and manage property issue reports
                        </p>
                    </div>
                </header>

                {/* No Reports State */}
                {reports.length === 0 && (
                    <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow p-10 text-center">
                        <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            No Reports Found
                        </h2>
                        <p className="text-gray-600 max-w-md">
                            There are currently no issue reports from your tenants.
                            Once a tenant submits a report regarding any room or unit,
                            it will appear in this section.
                        </p>
                    </div>
                )}

                {/* Reports Table */}
                {reports.length > 0 && (
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <div className="overflow-x-auto w-full">
                            <table className="w-full border-collapse min-w-max">
                                <thead className="bg-gray-200 text-gray-700 text-sm uppercase font-semibold">
                                    <tr>
                                        <th className="p-4 text-left">Report ID</th>
                                        <th className="p-4 text-left">Property</th>
                                        <th className="p-4 text-left">Description</th>
                                        <th className="p-4 text-left">Status</th>
                                        <th className="p-4 text-left">Date</th>
                                        <th className="p-4 text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {reports?.map((data, idx) => (
                                        <tr
                                            key={idx}
                                            className="border-b last:border-0 hover:bg-gray-50"
                                        >
                                            <td className="p-4 text-gray-800">
                                                {data?.report_id ?? (
                                                    <FileWarning className="w-5 h-5 text-red-500" />
                                                )}
                                            </td>

                                            <td className="p-4 text-gray-800">
                                                {data?.room_name || "Unknown Property"}
                                            </td>

                                            <td
                                                className="p-4 text-gray-600 max-w-xs truncate"
                                                title={data?.content}
                                            >
                                                {data?.content || "No description provided"}
                                            </td>

                                            <td className="p-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${data?.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : data?.status === "Resolved"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-gray-200 text-gray-700"
                                                        }`}
                                                >
                                                    {data?.status || "Unknown"}
                                                </span>
                                            </td>

                                            <td className="p-4 text-gray-600">
                                                {data?.date_reported || "N/A"}
                                            </td>

                                            <td className="p-4 flex items-center justify-center gap-3">
                                                <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600">
                                                    <Pencil className="w-5 h-5" />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-red-100 text-red-600">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default LandLordReport;
