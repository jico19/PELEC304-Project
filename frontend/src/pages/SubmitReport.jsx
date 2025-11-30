import NavBar from "src/components/NavBar"
import Footer from "src/components/Footer"
import { useState, useEffect } from "react"
import { useActiveRent } from "src/store/useActiveRent"
import { useProfile } from "src/store/useProfile"
import api from "src/utils/Api"
import { Menu, X, FileText, Send, Bell, ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom"

const SubmitReport = () => {
    const { profile } = useProfile()
    const { activeRent } = useActiveRent()
    const [content, setContent] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()


    useEffect(() => {
        console.log(profile)
        console.log(activeRent)
    }, [activeRent, profile])

    const submitReportHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('report/', {
                room: activeRent.room,
                reporter: profile.id,
                content: content
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
        setContent("")
    }

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50">
            <NavBar />

            <main className="flex-1 mt-16 sm:mt-24 px-4 sm:px-6 lg:px-8 py-10">

                {/* Go Back Button: Positioned above the max-width container */}
                <div className="max-w-3xl mx-auto mb-6">
                    <button
                        onClick={() => navigate(`/manage/rent/${profile.user_id}`)}
                        className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 
                           transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                           rounded-md p-2 -ml-2"
                    >
                        <ChevronLeft className="h-5 w-5 mr-1" />
                        Go Back
                    </button>
                </div>

                <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-2xl border border-gray-100">

                    {/* Header Section */}
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 flex items-center">
                        <FileText className="h-7 w-7 text-indigo-600 mr-3" />
                        Submit Your Report
                    </h1>
                    <p className="text-gray-500 mb-8 text-lg">
                        Please use this form to submit detailed reports.
                    </p>

                    {/* Form */}
                    <form onSubmit={submitReportHandler} className="space-y-6">
                        <div>
                            <label htmlFor="reportContent" className="block text-sm font-semibold text-gray-700 mb-2">
                                Report Details:
                            </label>
                            <textarea
                                id="reportContent"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={12}
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-inner text-gray-800
                           focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none 
                           placeholder:text-gray-400"
                                placeholder="Describe the incident, issue, or request in detail..."
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Submit Button (Loading state included) */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center 
                         px-6 py-3 border border-transparent text-base font-medium 
                         rounded-lg shadow-xl text-white 
                         bg-indigo-600 hover:bg-indigo-700 
                         focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500/50
                         transition duration-200 ease-in-out 
                         disabled:opacity-60 disabled:cursor-not-allowed"
                            disabled={!content.trim() || isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    {/* Simple loading spinner */}
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="h-5 w-5 mr-2" />
                                    Submit Report
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default SubmitReport