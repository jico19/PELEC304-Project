import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Home from "./pages/Home";
import LiveMapView from "./pages/LiveMapPage";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "react-hot-toast";
import RoomDetailPage from './pages/RoomDetailPage'
import ProfilePage from "./pages/ProfilePage";

import "leaflet/dist/leaflet.css";

function App() {
  return (
    <div className="w-full flex justify-center bg-gray-200 text-black">
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/live-map"
            element={
                  <LiveMapView />
          } />
          <Route
            path="/profile"
            element={
                  <ProfilePage />
          } />
          <Route path='/room/:slug_name' element={
                <RoomDetailPage />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
