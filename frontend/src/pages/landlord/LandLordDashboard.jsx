import { useEffect, useState } from "react";
import Sidebar from "src/components/SideBar";
import api from "src/utils/Api";
import { Home, Users, DollarSign, Clock } from "lucide-react";
import { useDashboard } from "src/store/useDashboard";

const Dashboard = () => {
    const { dashboardData, fetchDashboardData } = useDashboard()
    console.log(dashboardData)
    useEffect(() => {
        fetchDashboardData()
    }, [])

    console.log(dashboardData)

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar/>

            {/* Main content */}
            <div className="flex-1 p-8 space-y-10">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">Welcome Back!</h1>
                    <p className="text-gray-600">Here’s your latest property overview.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Active Properties */}
                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                        <Home className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="text-gray-500 text-sm">Active Properties</p>
                            <p className="text-3xl font-bold text-gray-800">{dashboardData.active_properties || 0}</p>
                        </div>
                    </div>

                    {/* Tenants */}
                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                        <Users className="w-8 h-8 text-green-600" />
                        <div>
                            <p className="text-gray-500 text-sm">Current Tenants</p>
                            <p className="text-3xl font-bold text-gray-800">{dashboardData.number_of_tenants || 0}</p>
                        </div>
                    </div>

                    {/* Earnings */}
                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                        <DollarSign className="w-8 h-8 text-yellow-600" />
                        <div>
                            <p className="text-gray-500 text-sm">Monthly Earnings</p>
                            <p className="text-3xl font-bold text-green-600">
                                ₱{dashboardData?.monthly_earnings?.toLocaleString() ?? "0"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main grid */}
                <div className="">

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>

                        {((dashboardData?.recent_activities ?? []).length) === 0 ? (
                            <p className="text-gray-500">No activity yet.</p>
                        ) : (
                            <div className="space-y-4 max-h-100 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
                                {dashboardData?.recent_activities.map((item, idx) => (
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
    );
};

export default Dashboard;
