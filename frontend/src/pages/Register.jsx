import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, User, Lock } from "lucide-react";
import toast from "react-hot-toast";
import api from "../utils/Api";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { role: "Tenant", username: "", password: "", confirmPassword: "" },
  });

  const navigate = useNavigate();
  const passwordWatch = watch("password");

  const formSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      await api.post("user/", data);
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/home"), 1000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 px-4 py-8 relative">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 flex items-center gap-2 bg-white text-indigo-700 px-4 py-2 rounded-lg shadow hover:bg-indigo-100 transition"
      >
        <ArrowLeft size={18} /> Home
      </button>

      {/* Hero Text */}
      <h1 className="text-4xl font-bold text-indigo-800 mb-2 text-center">
        Welcome to LCBNB
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Create an account to get started.
      </p>

      {/* Toggle Sign In / Sign Up */}
      <div className="bg-white shadow-md flex items-center rounded-lg w-full max-w-md mb-6">
        <Link
          to="/login"
          className="w-1/2 text-center py-2 rounded-l-lg font-semibold text-indigo-600 hover:bg-indigo-100 transition"
        >
          Sign In
        </Link>
        <button className="w-1/2 text-center py-2 rounded-r-lg font-semibold bg-indigo-600 text-white">
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="bg-white shadow-md flex flex-col items-center gap-4 p-6 rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">
          Create Account
        </h2>

        {/* Username */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            <User size={18} /> Username
          </label>
          <input
            type="text"
            {...register("username", { required: "Username is required." })}
            className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition
              ${errors.username ? "border-red-400" : "border-gray-300"}`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-600 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            <Lock size={18} /> Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required." })}
            className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition 
              ${errors.password ? "border-red-400" : "border-gray-300"}`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-gray-700 flex items-center gap-1">
            <Lock size={18} /> Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password.",
              validate: (value) =>
                value === passwordWatch || "Passwords do not match.",
            })}
            className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition 
              ${errors.confirmPassword ? "border-red-400" : "border-gray-300"}`}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition mt-3"
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Register;
