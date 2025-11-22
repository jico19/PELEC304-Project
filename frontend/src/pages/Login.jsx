import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/Api";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

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

      <div className="bg-white shadow-md flex items-center p-2 rounded-lg w-2/8 mb-8">
        <div className="w-full h-full bg-gray-200 p-1 flex justify-between  text-white font-semibold">
          <button className="w-1/2 bg-white text-black text-center cursor-pointer">Sign In</button>
          <Link to='/signup' className="w-1/2 hover:bg-white text-black text-center">Sign Up</Link>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(formSubmit)}
        className="bg-white shadow-md flex flex-col items-center gap-3 p-8 rounded-lg w-2/8"
      >
        <div className="w-full mb-5">
          <h1 className="font-bold text-2xl mb-2">Sign In</h1>
          <p className="text-gray-500 text-md">
            Enter your credentials to access your account.
          </p>
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
        <h1 className="text-sm text-left w-full">
          Forgot password? <span className="text-blue-500">Click here.</span>
        </h1>

        <button
          className="btn text-xl w-full hover:scale-95 transition-all cursor-pointer py-6"
          type="submit"
        >
          {isSubmitting ? <span className="loading"></span> : "Sign In"}
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

export default Login;
