import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "src/store/useToast"
import { Mail, ArrowLeft } from "lucide-react" // Lucide icons

const AskEmailForPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const { error, success } = useToast()
    const [loading, setLoading] = useState(false)

    const EmailHandler = async (e) => {
        e.preventDefault()
        if (!email) {
            error("Please enter your email.")
            return
        }

        setLoading(true)
        try {
            await axios.post('http://127.0.0.1:8000/api/password/reset/', {
                email
            })
            success("Password reset link sent! Please check your email.")

            // delay so user sees toast before redirecting
            setTimeout(() => {
                navigate("/login")
            }, 1500)
        } catch (err) {
            console.error(err)
            error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-50 px-4">
            <form
                onSubmit={EmailHandler}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6 relative"
            >
                {/* Go Back Button */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 flex items-center gap-1 text-gray-500 hover:text-gray-700"
                >
                    <ArrowLeft className="w-5 h-5" /> Go Back
                </button>

                <div className="flex flex-col items-center mb-4 mt-4">
                    <Mail className="w-12 h-12 text-indigo-600 mb-2" />
                    <h2 className="text-2xl font-bold text-indigo-700">Reset Password</h2>
                    <p className="text-gray-500 text-sm mt-1 text-center">
                        Enter your email to receive a reset link
                    </p>
                </div>

                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`py-3 px-6 rounded-lg font-bold text-white transition-colors ${
                        loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    )
}

export default AskEmailForPassword
