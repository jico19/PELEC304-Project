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
import 'leaflet/dist/leaflet.css';


function App() {

  return (
    <div className='w-full flex justify-center bg-gray-200 text-black'>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Register />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
