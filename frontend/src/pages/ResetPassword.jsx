import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useToast } from "src/store/useToast"
import { Lock, ArrowLeft } from "lucide-react" // Lucide icons

const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const { error, success } = useToast()
    const [loading, setLoading] = useState(false)

    const TokenChecker = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/password/reset/validate_token/', {
                token,
            })
            console.log(res.data)
        } catch (err) {
            console.log(err)
            error("You are using an invalid token. Please try again.")
            navigate('/login', { replace: true })
        }
    }

    useEffect(() => {
        if (!token) {
            error("You can't access this page.")
            navigate("/login", { replace: true })
            return
        }

        const checkToken = async () => {
            try {
                const res = await axios.post('http://127.0.0.1:8000/api/password/reset/validate_token/', {
                    token,
                })
                console.log(res.data)
            } catch (err) {
                console.log(err)
                error("You are using an invalid token. Please try again.")
                navigate('/login', { replace: true })
            }
        }

        checkToken()
        // Only run on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const SubmitResetPasswordHandler = async (e) => {
        e.preventDefault()
        setPasswordError("")

        if (!password || !confirmPassword) {
            setPasswordError("All fields are required.")
            return
        }
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.")
            return
        }

        setLoading(true)
        try {
            await axios.post('http://127.0.0.1:8000/api/password/reset/confirm/', {
                password,
                token
            })
            success("Your password has been changed!")

            setTimeout(() => {
                navigate("/login")
            }, 1500)
        } catch (err) {
            console.error(err)
            if (err.status == 400) {
                error(err.response.data)
            }
            error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-50 px-4">
            <form
                onSubmit={SubmitResetPasswordHandler}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6 relative"
            >
                {/* Go Back Button */}
                <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="absolute top-4 left-4 flex items-center gap-1 text-gray-500 hover:text-gray-700"
                >
                    <ArrowLeft className="w-5 h-5" /> Go Back
                </button>

                <div className="flex flex-col items-center mb-4 mt-4">
                    <Lock className="w-12 h-12 text-indigo-600 mb-2" />
                    <h2 className="text-2xl font-bold text-indigo-700">Reset Password</h2>
                    <p className="text-gray-500 text-sm mt-1 text-center">
                        Enter your new password below
                    </p>
                </div>

                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`py-3 px-6 rounded-lg font-bold text-white transition-colors ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {loading ? "Submitting..." : "Reset Password"}
                </button>
            </form>
        </div>
    )
}

export default ResetPassword
