import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import { ArrowLeft, Home, Calendar, Bell, CreditCard, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useActiveRent } from "src/store/useActiveRent";
import api from "src/utils/Api";

const ManageRent = () => {
    const { activeRent, fetchActiveRent } = useActiveRent();
    const [paymentHist, setPaymentHist] = useState([]);

    useEffect(() => {
        const getPaymentHistory = async () => {
            try {
                const res = await api.get("payment/");
                setPaymentHist(res.data.results);
            } catch (error) {
                console.log(error);
            }
        };
        getPaymentHistory();
        fetchActiveRent();
    }, []);

    const PaymentHandler = async () => {
        try {
            await api.post("payment/", {
                room: activeRent.room,
                amount: activeRent.amount,
            });
            fetchActiveRent();
            const res = await api.get("payment/");
            setPaymentHist(res.data.results);
        } catch (error) {
            console.log(error);
            alert("Payment failed. Try again.");
        }
    };

    const tenantName = activeRent.tenant_name || "Tenant";
    const currentRent = activeRent.amount || 0;
    const dueDate = activeRent.due_date ? new Date(activeRent.due_date).toLocaleDateString("en-PH") : "N/A";
    const daysUntilDue = activeRent.due_date ? Math.ceil((new Date(activeRent.due_date) - new Date()) / (1000 * 60 * 60 * 24)) : 0;

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50">
            {/* NAVBAR */}
            <NavBar />

            {/* MAIN CONTENT */}
            <main className="flex-1 mt-24 px-4">
                <div className="container mx-auto max-w-6xl py-8 space-y-8">

                    {/* Back & Header */}
                    <div className="mb-6">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {tenantName}!</h1>
                                <p className="text-gray-600">Here's everything you need to manage your rented space</p>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                                <button className="flex items-center border border-gray-300 rounded px-3 py-1 hover:bg-gray-100">
                                    <Bell className="w-4 h-4 mr-2" /> Report
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Rent Overview */}
                    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 mb-6 animate-fade-in">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            {/* Left: Icon + Title */}
                            <div className="flex items-center gap-4">
                                <CreditCard className="w-10 h-10 text-indigo-600 animate-pulse" />
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Rent Overview</h2>
                                    <p className="text-gray-500 mt-1">Your current payment status</p>
                                </div>
                            </div>

                            {/* Right: Button */}
                            <button
                                onClick={PaymentHandler}
                                className="mt-3 md:mt-0 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors shadow-lg transform hover:-translate-y-1 hover:scale-105"
                            >
                                Pay Now
                            </button>
                        </div>

                        {/* Info Grid */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition transform hover:-translate-y-1">
                                <p className="text-gray-500 text-sm">Monthly Rent</p>
                                <p className="text-xl font-bold text-indigo-700">${currentRent}</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition transform hover:-translate-y-1">
                                <p className="text-gray-500 text-sm">Due Date</p>
                                <p className="text-xl font-bold text-indigo-700">{dueDate}</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition transform hover:-translate-y-1">
                                <p className="text-gray-500 text-sm">Days Until Due</p>
                                <p className="text-xl font-bold text-indigo-700">{daysUntilDue} day{daysUntilDue !== 1 ? "s" : ""}</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition transform hover:-translate-y-1">
                                <p className="text-gray-500 text-sm">Status</p>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${activeRent.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {activeRent.status || "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Recent Payments */}
                        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1 animate-fade-in">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="w-5 h-5 text-indigo-600" />
                                <h3 className="text-lg font-semibold">Recent Payments</h3>
                            </div>
                            <div className="space-y-2">
                                {paymentHist.length ? paymentHist.map((p, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-gray-100 rounded p-2 hover:bg-gray-200 transition">
                                        <div>
                                            <p className="font-medium">{new Date(p.date_paid).toLocaleString("en-US", { month: "long", year: "numeric" })}</p>
                                            <p className="text-sm text-gray-600">${p.amount}</p>
                                        </div>
                                        <span className="text-green-600 font-semibold">Paid</span>
                                    </div>
                                )) : <p className="text-gray-500">No payments yet.</p>}
                            </div>
                        </div>

                        {/* Reminders */}
                        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1 animate-fade-in">
                            <div className="flex items-center gap-2 mb-4">
                                <Bell className="w-5 h-5 text-yellow-600" />
                                <h3 className="text-lg font-semibold">Reminders & Alerts</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="p-2 bg-yellow-100 rounded hover:bg-yellow-200 transition">
                                    <p className="text-sm font-medium">Rent Due Soon</p>
                                    <p className="text-xs text-gray-600">Payment due on {dueDate}</p>
                                </div>
                            </div>
                        </div>

                        {/* Your Room */}
                        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1 animate-fade-in">
                            <div className="flex items-center gap-2 mb-4">
                                <Home className="w-5 h-5 text-indigo-600" />
                                <h3 className="text-lg font-semibold">Your Room</h3>
                            </div>
                            <p className="text-gray-500 text-sm">Property</p>
                            <p className="font-semibold">{activeRent.room_name || "N/A"}</p>
                            <p className="text-gray-500 text-sm mt-2">Status</p>
                            <p className="font-semibold">{activeRent.status || "N/A"}</p>
                        </div>

                    </div>

                </div>
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default ManageRent;
