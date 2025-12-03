import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const oatuh_key = import.meta.env.VITE_OAUTH_PROVIDER_KEY

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={oatuh_key}>
      <App />
    </GoogleOAuthProvider>
  </QueryClientProvider>
)
