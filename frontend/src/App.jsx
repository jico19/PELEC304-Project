import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Home from './pages/Home'
import LiveMapView from './pages/LiveMapPage'
import LandingPage from './pages/LandingPage'
import RoomDetailPage from './pages/RoomDetailPage'
import UserProfile from './pages/UserProfile'
import ManageRent from './pages/ManageRent'
import SubmitReport from './pages/SubmitReport'
import 'leaflet/dist/leaflet.css';
import Recomendataions from './pages/Recomendataions'
import { Toaster } from "react-hot-toast";
import About from './pages/About'
import ResetPassword from './pages/ResetPassword'
import AskEmailForPassword from './pages/AskEmailResetPassword'

function App() {

  return (
    <div className='w-full flex justify-center bg-gray-200 text-black'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/reset/password" element={<AskEmailForPassword />} />
          <Route path="/reset/password/confirm" element={<ResetPassword />} />
          <Route path='/home' element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          } />
          <Route path='/live-map' element={
            <LiveMapView />
          } />
          <Route path='/room/:slug_name' element={
            <ProtectedRoutes>
              <RoomDetailPage />
            </ProtectedRoutes>
          } />
          <Route path='/profile/:user_id' element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          } />
          <Route path='/manage/rent/:user_id' element={
            <ProtectedRoutes>
              <ManageRent />
            </ProtectedRoutes>
          } />
          <Route path='/submit-report' element={
            <ProtectedRoutes>
              <SubmitReport />
            </ProtectedRoutes>
          } />
          <Route path='/room/recomendation' element={
            <ProtectedRoutes>
              <Recomendataions />
            </ProtectedRoutes>
          } />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  )
}

export default App
