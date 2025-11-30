import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/Api";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: "Tenant",
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const selectedRole = watch("role");

  const formSubmit = async (data) => {
    console.log(data);
    try {
      const response = await api.post("user/", data);
      toast.success("Login Successfully.");
      // setTimeout(() => {
      //   navigate("/home");
      // }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <button
        onClick={() => navigate("/")}
        className="btn absolute top-10 right-20 hover:bg-white hover:text-black"
      >
        Back to Home 
      </button>
      <h1 className="font-bold text-3xl mb-2">Welcome to LCBNB</h1>
      <p className="text-gray-500 mb-8">
        Sign in or create an account to get started.
      </p>

      <div className="bg-white shadow-md flex items-center p-2 rounded-lg lg:w-2/8 w-4/5 mb-8">
        <div className="w-full h-full bg-gray-200 p-1 flex justify-between  text-white font-semibold">
          <Link to="/login" className="w-1/2 hover:bg-white text-black text-center">
            Sign In
          </Link>
          <button className="w-1/2 bg-white text-black text-center cursor-pointer">
            Sign Up
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(formSubmit)}
        className="bg-white shadow-md flex flex-col items-center gap-3 p-8 rounded-lg w-4/5 lg:w-2/8"
      >
        <div className="w-full mb-5">
          <h1 className="font-bold text-2xl mb-2">Create Account</h1>
          <p className="text-gray-500 text-md">
            Choose your account type to get started.
          </p>
        </div>

        <div className="w-full flex justify-between gap-2 mb-4">
          <label
            className={`relative flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-all border-2 w-1/2 ${
              selectedRole === "Tenant"
                ? "border-black bg-gray-100"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              value="Tenant"
              {...register("role")}
              className="absolute opacity-0"
            />
            <img
              src="https://img.icons8.com/?size=100&id=12438&format=png&color=000000"
              alt="User"
              className="w-6 h-6"
            />

            <div className="font-bold">Tenant</div>
            <div className="text-sm text-gray-500 text-center">Looking for a place</div>
          </label>

          <label
            className={`relative flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-all border-2 w-1/2  ${
              selectedRole === "Landlord"
                ? "border-black bg-gray-100"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              value="Landlord"
              {...register("role")}
              className="absolute opacity-0"
            />
            <img
              src="https://img.icons8.com/?size=100&id=73&format=png&color=000000"
              alt="User"
              className="w-6 h-6"
            />

            <div className="font-bold">Landlord</div>
            <div className="text-sm text-gray-500 text-center">Have property to rent</div>
          </label>
        </div>

        <div className="w-full flex flex-col gap-2">
          <h1>Username</h1>
          <input
            type="text"
            {...register("username", { required: "Username is required." })}
            placeholder={`${
              errors.username ? errors.username?.message : "Enter your username"
            }`}
            className={`w-full bg-white px-5 py-3 rounded-md border shadow-md focus:outline-none focus:scale-95 transition-all ${
              errors.username
                ? "border-red-400 text-red-500"
                : "border-gray-400"
            }`}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <h1>Password</h1>
          <input
            type="password"
            {...register("password", { required: "Password is required." })}
            placeholder={`${
              errors.password ? errors.password?.message : "Enter your password"
            }`}
            className={`w-full bg-white px-5 py-3 rounded-lg border  shadow-md focus:outline-none focus:scale-95 transition-all ${
              errors.password
                ? "border-red-400 text-red-500"
                : "border-gray-400"
            }`}
          />
        </div>

        <button
          className="btn text-xl w-full hover:scale-95 transition-all cursor-pointer py-6 mt-2"
          type="submit"
        >
          {isSubmitting ? <span className="loading"></span> : "Sign Up"}
        </button>

        {errors.root && (
          <p className="text-red-600 text-xs mb-5">
            <img
              src="https://img.icons8.com/?size=100&id=60673&format=png&color=FA5252"
              alt="error"
              className="inline mr-1 w-4 h-4"
            ></img>
            {errors.root?.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
