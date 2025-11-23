import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
        'role': 'tenant',
        'username': '',
        'password': ''
    }
  });

  const navigate = useNavigate();
  const selectedRole = watch("role");

  const formSubmit = async (data) => {
    // console.log(data)
    // try {
    //   const response = await api.post('token/', data)
    //   localStorage.setItem('access_token', response.data.access)
    //   localStorage.setItem('refresh_token', response.data.refresh)
    //   toast.success('Login Successfully.')
    //   setTimeout(()=>{
    //     navigate('/main')
    //   },1000)
    // } catch (error) {
    //   console.log(error)
    // }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-3xl mb-2">Welcome to LCBNB</h1>
      <p className="text-gray-500 mb-8">
        Sign in or create an account to get started.
      </p>

      <div className="bg-white shadow-md flex items-center p-2 rounded-lg w-4/5 md:w-2/8 mb-8">
        <div className="w-full h-full bg-gray-200 p-1 flex justify-between  text-white font-semibold">
          <Link to="/" className="w-1/2 hover:bg-white text-black text-center">
            Sign In
          </Link>
          <button className="w-1/2 bg-white text-black text-center cursor-pointer">
            Sign Up
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(formSubmit)}
        className="bg-white shadow-md flex flex-col items-center gap-3 p-8 rounded-lg w-4/5 md:w-2/8"
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
              selectedRole === "tenant"
                ? "border-black bg-gray-100"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              value="tenant"
              {...register("role")}
              className="absolute opacity-0"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <div className="font-bold">Tenant</div>
            <div className="text-sm text-gray-500">Looking for a place</div>
          </label>

          <label
            className={`relative flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-all border-2 w-1/2  ${
              selectedRole === "landlord"
                ? "border-black bg-gray-100"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              value="landlord"
              {...register("role")}
              className="absolute opacity-0"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <div className="font-bold">Landlord</div>
            <div className="text-sm text-gray-500">Have property to rent</div>
          </label>
        </div>

        <div className="w-full flex flex-col gap-2">
          <h1>Username</h1>
          <input
            type="text"
            {...register("username", { required: "Username is required." })}
            placeholder={`${
              errors.username ? errors.username?.message : "Username"
            }`}
            className={`w-full bg-gray-100 px-5 py-3 rounded-md border shadow-md focus:outline-none focus:scale-95 transition-all ${
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
              errors.password ? errors.password?.message : "Password"
            }`}
            className={`w-full bg-gray-100 px-5 py-3 rounded-lg border  shadow-md focus:outline-none focus:scale-95 transition-all ${
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
