import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import { useEffect, useState } from "react";
import { useToast } from "src/store/useToast";
import api from "src/utils/Api";
import { File, CheckCircle, XCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

const LandlordApplication = () => {
    const { success, error } = useToast();
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");

    const HandleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (!file) return error("Please select a file.");

        const formData = new FormData();
        formData.append("document", file);

        try {
            await toast.promise(
                api.post('application/', formData),
                {
                    loading: "Processing document.",
                    success: "Application sent successfully, Please wait.",
                    error: "Failed to process your application."
                }
            );
            setFile(null);
            setStatus("Pending"); // reset status after submission
        } catch (err) {
            if (err.response?.data?.applicant) {
                error(err.response.data.applicant);
            } else {
                error("There's something wrong, please try again.");
            }
        }
    };

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await api.get('application/');
                if (res.data.results?.length > 0) {
                    setStatus(res.data.results[0].status);
                }
            } catch (err) {
                error("There's something wrong fetching the data.");
                console.log(err);
            }
        };
        fetchStatus();
    }, []);

    const getStatusStyle = () => {
        switch (status.toLowerCase()) {
            case "approved":
                return { text: "Approved", color: "text-green-700", bg: "bg-green-100", icon: <CheckCircle className="w-5 h-5" /> };
            case "rejected":
                return { text: "Rejected", color: "text-red-700", bg: "bg-red-100", icon: <XCircle className="w-5 h-5" /> };
            default:
                return { text: "Pending", color: "text-yellow-700", bg: "bg-yellow-100", icon: <Clock className="w-5 h-5" /> };
        }
    };

    const statusStyle = getStatusStyle();

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50">
            <NavBar />

            <main className="flex-1 pt-32 pb-12 px-4 md:px-6">
                <div className="max-w-xl mx-auto bg-white shadow-sm rounded-xl p-6 border border-gray-200">

                    {/* Header */}
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                        Landlord Application
                    </h1>

                    {/* Application Status */}
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg mb-4 ${statusStyle.bg}`}>
                        {statusStyle.icon}
                        <span className={`font-medium ${statusStyle.color}`}>{statusStyle.text}</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                        Submit one valid document to verify your identity. Once approved,
                        you’ll gain access to the landlord dashboard to manage properties.
                    </p>

                    {/* Process Explanation */}
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                        <h2 className="text-sm font-medium text-indigo-800 mb-2">
                            How the process works:
                        </h2>
                        <ul className="text-sm text-indigo-900 space-y-1 list-disc list-inside">
                            <li>You upload a verification document (ID, permit, proof of ownership, etc.).</li>
                            <li>Your application is sent to the administrator for manual review.</li>
                            <li>Once approved, your account will be upgraded to Landlord.</li>
                            <li>You will receive a notification through your email regarding the status.</li>
                        </ul>
                    </div>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={HandleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Verification Document
                            </label>
                            <label className={`flex items-center w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg ${status == 'Pending'?  "bg-gray-400 cursor-not-allowed opacity-70" : "cursor-pointer"} hover:bg-gray-200`}>
                                <File className="w-5 h-5 text-indigo-600 mr-2" />
                                <span className="text-sm text-gray-800">
                                    {file ? file.name : "Choose a file..."}
                                </span>
                                <input
                                    disabled={status === "Pending"}
                                    type="file"
                                    className="hidden"
                                    onChange={HandleFileChange}
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "Pending"}
                            className={`w-full py-2.5 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2
                            ${status === "Pending"
                                    ? "bg-gray-400 cursor-not-allowed opacity-70"  // Disabled style
                                    : "bg-indigo-600 hover:bg-indigo-700"          // Active style
                                }`}
                        >
                            <File className="w-4 h-4" />
                            Submit Application
                        </button>
                    </form>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LandlordApplication;
