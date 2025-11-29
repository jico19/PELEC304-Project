import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginTest = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    const id_token = credentialResponse.credential; // Google ID token

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/google/",
        {
          token: id_token,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // store info in the localstorage
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("profile_pic", res.data.user.avatar);
      console.log(res.data)
      navigate("/home");
    } catch (err) {
      console.error(
        "Error sending ID token to backend:",
        err.response?.data || err
      );
      console.log(id_token)
    }
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          console.log("Google Login Failed");
        }}
        theme="outline" // "filled_blue" (default), "filled_black", or "outline"
        size="large" // "small", "medium", or "large"
        text="continue_with" // "signin_with", "signup_with", "continue_with", "login" (note: some may not be officially localized)
        shape="rectangular" // "rectangular" or "pill" (rounded corners)
        logo_alignment="center" // "left" or "center"
      />
    </div>
  );
};

export default GoogleLoginTest;
