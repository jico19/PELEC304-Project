import { useEffect } from "react"
import Sidebar from "src/components/SideBar"
import { useAdminDashboard } from "src/store/useAdminDashboard"
import { Eye, Check, X } from "lucide-react"

const AdminPropertyManagement = () => {
    const { dashboardData, fetchAdminDashboardData } = useAdminDashboard()

    useEffect(() => {
        fetchAdminDashboardData()
    }, [])

    const applicants = dashboardData?.applicants || []

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-8 space-y-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                        Application Center
                    </h1>
                    <p className="text-gray-600">Manage and review submitted landlord applications</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full min-w-max">
                            <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
                                <tr>
                                    <th className="p-4 text-left">Application ID</th>
                                    <th className="p-4 text-left">Applicant Name</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Date Applied</th>
                                    <th className="p-4 text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="text-gray-700 text-sm">
                                {applicants.length > 0 ? (
                                    applicants.map((a) => (
                                        <tr
                                            key={a.id}
                                            className="border-b hover:bg-gray-50 transition"
                                        >
                                            <td className="p-4 font-medium text-gray-800">
                                                {a.application_id}
                                            </td>

                                            <td className="p-4">{a.applicant_name}</td>

                                            <td className="p-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        a.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : a.status === "Approved"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {a.status}
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                {new Date(a.applied_at).toLocaleString()}
                                            </td>

                                            <td className="p-4 flex items-center gap-4">
                                                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                                                    <Eye size={18} />
                                                    <span>View</span>
                                                </button>

                                                <button className="flex items-center gap-1 text-green-600 hover:text-green-800">
                                                    <Check size={18} />
                                                    <span>Approve</span>
                                                </button>

                                                <button className="flex items-center gap-1 text-red-600 hover:text-red-800">
                                                    <X size={18} />
                                                    <span>Reject</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-6 text-center text-gray-500">
                                            No applications found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminPropertyManagement
