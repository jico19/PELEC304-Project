import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../utils/Api";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { role: "Tenant", username: "", password: "" },
  });

  const navigate = useNavigate();
  const selectedRole = watch("role");

  const formSubmit = async (data) => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 bg-white text-indigo-700 px-4 py-2 rounded-lg shadow hover:bg-indigo-100 transition"
      >
        Back to Home
      </button>

      {/* Hero Text */}
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2 text-center">
        Welcome to LCBNB
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Sign in or create an account to get started.
      </p>

      {/* Toggle Sign In / Sign Up */}
      <div className="bg-white shadow-md flex items-center rounded-lg w-full max-w-md mb-6">
        <Link
          to="/login"
          className="w-1/2 text-center py-2 rounded-l-lg font-semibold text-indigo-600 hover:bg-indigo-100 transition"
        >
          Sign In
        </Link>
        <button className="w-1/2 text-center py-2 rounded-r-lg font-semibold bg-indigo-600 text-white cursor-pointer">
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="bg-white shadow-md flex flex-col items-center gap-4 p-6 rounded-lg w-full max-w-md"
      >
        {/* Form Header */}
        <div className="w-full text-center mb-4">
          <h2 className="text-2xl font-bold text-indigo-800 mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm">
            Choose your account type to get started.
          </p>
        </div>
        
        {/* Username */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-gray-700">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required." })}
            placeholder={errors.username ? errors.username.message : "Enter your username"}
            className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.username ? "border-red-400 text-red-500" : "border-gray-300"
              }`}
          />
        </div>

        {/* Password */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required." })}
            placeholder={errors.password ? errors.password.message : "Enter your password"}
            className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.password ? "border-red-400 text-red-500" : "border-gray-300"
              }`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition mt-2"
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Errors */}
        {errors.root && (
          <p className="text-red-600 text-sm mt-2">{errors.root.message}</p>
        )}
      </form>
    </div>
  );
};

export default Register;
