import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import { ArrowLeft, Home, Calendar, Bell, CreditCard, MessageSquare, Bed, CheckCircle, XCircle, DollarSign, Calendar1Icon, Clock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useActiveRent } from "src/store/useActiveRent";
import api from "src/utils/Api";
import { useProfile } from "src/store/useProfile";
import { useToast } from "src/store/useToast";
import toast from "react-hot-toast";

const ManageRent = () => {
    const { activeRent, fetchActiveRent } = useActiveRent();
    const { profile } = useProfile()
    const [paymentHist, setPaymentHist] = useState([]);
    const navigate = useNavigate()
    const { success, error, loading } = useToast();


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
        } catch (err) {
            console.log(err);
            error("Payment failed. Try again.");
        }
    };

    const MovingOutHandler = async () => {
        try {
            await toast.promise(
                api.delete(`active/${activeRent.id}/`),
                {
                    loading: "Processing.",
                    success: "You have move out successfully.",
                    error: "Failed to do action."
                }
            )
            navigate('/home')
        } catch (err) {
            console.log(err)
            error("Ther's something wrong please try again.")
        } 
    }


    const tenantName = activeRent?.tenant_name ?? profile?.username ?? "Guest";
    const currentRent = activeRent?.amount ?? 0;
    const dueDate = activeRent?.due_date
        ? new Date(activeRent.due_date).toLocaleDateString("en-PH")
        : "N/A";

    const daysUntilDue = activeRent?.due_date
        ? Math.ceil((new Date(activeRent.due_date) - new Date()) / (1000 * 60 * 60 * 24))
        : 0;

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
                                <button
                                    className="flex items-center border border-gray-300 rounded px-3 py-1 hover:bg-gray-100"
                                    onClick={() => navigate('/submit-report')}
                                >
                                    <Bell className="w-4 h-4 mr-2" /> Report
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Rent Overview */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* 1. Monthly Rent Card */}
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-md 
                    hover:shadow-lg transition duration-300 transform hover:translate-y-[-2px]">
                            <div className="flex items-start justify-between mb-2">
                                <p className="text-sm font-medium text-gray-500">Monthly Rent</p>
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <p className="text-3xl font-extrabold text-gray-900">${currentRent}</p>
                        </div>

                        {/* 2. Due Date Card */}
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-md 
                    hover:shadow-lg transition duration-300 transform hover:translate-y-[-2px]">
                            <div className="flex items-start justify-between mb-2">
                                <p className="text-sm font-medium text-gray-500">Due Date</p>
                                <Calendar className="w-5 h-5 text-indigo-600" />
                            </div>
                            <p className="text-3xl font-extrabold text-gray-900">{dueDate}</p>
                        </div>

                        {/* 3. Days Until Due Card */}
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-md 
                    hover:shadow-lg transition duration-300 transform hover:translate-y-[-2px]">
                            <div className="flex items-start justify-between mb-2">
                                <p className="text-sm font-medium text-gray-500">Days Until Due</p>
                                <Clock className="w-5 h-5 text-yellow-500" />
                            </div>
                            <p className="text-3xl font-extrabold text-gray-900">
                                {daysUntilDue} <span className="text-xl font-semibold text-gray-600">day{daysUntilDue !== 1 ? "s" : ""}</span>
                            </p>
                        </div>

                        {/* 4. Status Card */}
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-md 
                    hover:shadow-lg transition duration-300 transform hover:translate-y-[-2px]">
                            <div className="flex items-start justify-between mb-2">
                                <p className="text-sm font-medium text-gray-500">Status</p>
                                <CheckCircle className="w-5 h-5 text-blue-500" />
                            </div>

                            {/* Enhanced Status Pill */}
                            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-base font-semibold ${activeRent?.status === 'Paid'
                                ? 'bg-green-100 text-green-800 ring-1 ring-green-600'
                                : 'bg-red-100 text-red-800 ring-1 ring-red-600'
                                }`}>
                                {activeRent?.status || "N/A"}
                            </span>
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

                        <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 
                hover:shadow-2xl transition duration-300 ease-in-out 
                transform hover:scale-[1.02] hover:-translate-y-0.5">

                            {/* Card Header and Icon (Unchanged) */}
                            <div className="flex items-center gap-3 mb-4 border-b pb-3">
                                <Home className="w-6 h-6 text-indigo-700" /> {/* Main Home Icon */}
                                <h3 className="text-xl font-bold text-gray-800">Your Room</h3>
                            </div>

                            {/* Property Details Grid (Unchanged) */}
                            {activeRent?.room_name && activeRent?.status ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4 mb-6">

                                    {/* Room Name / Property */}
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                            <Bed className="w-4 h-4 text-gray-400" /> Property
                                        </p>
                                        <p className="text-base font-semibold text-gray-900 truncate">
                                            {activeRent?.room_name || "N/A"}
                                        </p>
                                    </div>

                                    {/* Status */}
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                            {activeRent?.status === 'Active' ? (
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-red-500" />
                                            )}
                                            Status
                                        </p>
                                        <p className={`text-base font-semibold ${activeRent?.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
                                            {activeRent?.status || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center w-full py-8 rounded-xl border border-gray-200 bg-gray-50">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                        You haven’t rented anything yet.
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Find a place that fits your needs and start renting.
                                    </p>

                                    <button
                                        onClick={() => navigate('/home')}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                                    >
                                        Browse Rooms
                                    </button>
                                </div>
                            )}

                            {/* --- REDESIGNED ACTION BUTTONS --- */}
                            <div className="flex justify-between gap-3 mt-4">

                                {/* 1. Secondary Button: Move out (Outline/Ghost Style, Red for warning) */}
                                <button
                                    className="w-1/2 py-2 px-3 flex items-center justify-center gap-1.5 
                                        text-sm font-medium rounded-lg 
                                        text-red-600 border border-red-600 
                                        hover:bg-red-50 hover:shadow-inner 
                                        transition duration-150 ease-in-out"
                                    onClick={() => MovingOutHandler()}
                                >
                                    {/* Assuming LogOut icon is available */}
                                    <LogOut className="w-4 h-4" />
                                    Move out
                                </button>

                                {/* 2. Primary Button: Pay rent (Solid Style, Indigo for primary action) */}
                                <button
                                    className="w-1/2 py-2 px-3 flex items-center justify-center gap-1.5 
                                    text-sm font-semibold 
                                    bg-indigo-600 text-white rounded-lg shadow-md 
                                    hover:bg-indigo-700 hover:shadow-lg 
                                    focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 
                                    transition duration-150 ease-in-out"
                                    onClick={PaymentHandler}
                                >
                                    {/* Assuming CreditCard icon is available */}
                                    <CreditCard className="w-4 h-4" />
                                    Pay rent
                                </button>
                            </div>
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
