import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='1080730339050-jieb9h9ksmpeh48jrqtu0hfokpqlsvf7.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>,
)
