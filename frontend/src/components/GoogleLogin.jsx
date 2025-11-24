import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginTest = () => {
    const navigate = useNavigate()

    const handleGoogleLogin = async (credentialResponse) => {
        const id_token = credentialResponse.credential; // Google ID token

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/auth/google/",
                {
                    "token": id_token
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            // store info in the localstorage
            localStorage.setItem("access_token", res.data.access)
            localStorage.setItem("refresh_token", res.data.refresh)
            localStorage.setItem("profile_pic", res.data.user.avatar)
            navigate('/home')

        } catch (err) {
            console.error("Error sending ID token to backend:", err.response?.data || err);
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
                console.log("Google Login Failed");
            }}
        />
    );
};

export default GoogleLoginTest;
