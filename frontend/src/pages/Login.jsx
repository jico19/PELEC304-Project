import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../utils/Api";
import GoogleLoginTest from "src/components/GoogleLogin";
import { useRole } from "src/store/useRole";


const Login = () => {

  const { fetchRole } = useRole()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const formSubmit = async (data) => {
    try {
      const response = await api.post("token/", data);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      toast.success("Login Successfully.");
      await fetchRole()
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Check your credentials.");
    }
  };

  useEffect(() => {

  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 px-4">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 bg-white text-indigo-700 px-4 py-2 rounded-lg shadow hover:bg-indigo-100 transition"
      >
        Back to Home
      </button>

      {/* Hero text */}
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2 text-center">
        Welcome to LCBNB
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Sign in or create an account to get started.
      </p>

      {/* Toggle Sign In / Sign Up */}
      <div className="bg-white shadow-md flex items-center p-1 rounded-lg w-full max-w-md mb-6">
        <button className="w-1/2 bg-indigo-600 text-white py-2 rounded-l-lg font-semibold">
          Sign In
        </button>
        <Link
          to="/signup"
          className="w-1/2 text-indigo-600 text-center py-2 rounded-r-lg font-semibold hover:bg-indigo-100 transition"
        >
          Sign Up
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="bg-white shadow-md flex flex-col items-center gap-4 p-6 rounded-lg w-full max-w-md"
      >
        <div className="w-full mb-4 text-center">
          <h1 className="font-bold text-2xl mb-1 text-indigo-800">Sign In</h1>
          <p className="text-gray-500 text-sm">
            Enter your credentials to access your account.
          </p>
        </div>

        {/* Username */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-gray-700">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required." })}
            placeholder={
              errors.username
                ? errors.username.message
                : "Enter your username"
            }
            className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.username
                ? "border-red-400 text-red-500"
                : "border-gray-300"
              }`}
          />
        </div>

        {/* Password */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required." })}
            placeholder={
              errors.password
                ? errors.password.message
                : "Enter your password"
            }
            className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.password
                ? "border-red-400 text-red-500"
                : "border-gray-300"
              }`}
          />
        </div>

        {/* Forgot password */}
        <button className="self-start text-sm text-green-600 hover:underline" onClick={() => navigate('/reset/password')}>
          Forgot password?
        </button>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>

        {/* Errors */}
        {errors.root && (
          <p className="text-red-600 text-sm mt-2">
            {errors.root.message}
          </p>
        )}

        {/* Or divider */}
        <div className="flex items-center w-full my-2">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login */}
        <GoogleLoginTest />
      </form>
    </div>
  );
};

export default Login;
