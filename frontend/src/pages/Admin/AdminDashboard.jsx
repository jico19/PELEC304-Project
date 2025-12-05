import Sidebar from "src/components/SideBar"
import { Users, Clock, MessageSquareWarning } from "lucide-react"
import { useEffect, useState } from "react"
import { useAdminDashboard } from "src/store/useAdminDashboard"


const AdminDashboard = () => {
    const { dashboardData, fetchAdminDashboardData } = useAdminDashboard()

    useEffect(() => {
        fetchAdminDashboardData()
    }, [])

    // console.log(dashboardData)

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-8 space-y-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">Admin Dashboard</h1>
                    <p className="text-gray-600">Monitor and manage your platform</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* total users */}
                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                        <Users className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="text-gray-500 text-sm">Total Users</p>
                            <p className="text-3xl font-bold text-gray-800">{dashboardData?.total_user || 0}</p>
                        </div>
                    </div>
                    {/* total landlords */}
                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                        <Users className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="text-gray-500 text-sm">Total Landlords</p>
                            <p className="text-3xl font-bold text-gray-800">{dashboardData?.total_landlords || 0}</p>
                        </div>
                    </div>
                    {/* pending approvals */}
                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                        <Clock className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="text-gray-500 text-sm">Pending Approvals</p>
                            <p className="text-3xl font-bold text-gray-800">{dashboardData?.pending_approvals || 0}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                        <MessageSquareWarning className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="text-gray-500 text-sm">Submitted Reports</p>
                            <p className="text-3xl font-bold text-gray-800">{dashboardData?.subbmited_reports || 0}</p>
                        </div>
                    </div>
                </div>
                {/* main grid */}
                <div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                        {((dashboardData?.recent_reports ?? []).length) === 0 ? (
                            <p className="text-gray-500">No activity yet.</p>
                        ) : (
                            <div className="space-y-4 max-h-100 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                                {dashboardData?.recent_reports.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="border-b border-gray-200 pb-4 last:border-none last:pb-0"
                                    >
                                        <p className="font-medium text-gray-800">{item.content}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Date Sent: {item.date_sent ? new Date(item.date_sent).toLocaleString() : "N/A"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminDashboard