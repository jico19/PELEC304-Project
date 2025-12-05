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
import LandlordApplication from './pages/LandlordApplication'
import LandLordDashboard from './pages/landlord/LandLordDashboard'
import LandLordProperties from './pages/landlord/LandlordProperties'
import LandLordReport from './pages/landlord/LandlordReports'
import LandlordProfile from './pages/landlord/LandlordProfile'
import AddProperty from './pages/landlord/AddProperty'
import PropertyEdit from './pages/landlord/PropertyEdit'
import PropertyView from './pages/landlord/ViewPorperty'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminPropertyManagement from './pages/Admin/AdminPropertyManagement'

function App() {

  return (
    <div className=' text-black'>
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
          <Route path='/landlord/application' element={
            <ProtectedRoutes>
              <LandlordApplication />
            </ProtectedRoutes>
          } />
          <Route path='/landlord/dashboard' element={
            <ProtectedRoutes>
              <LandLordDashboard />
            </ProtectedRoutes>
          } />
          <Route path='/landlord/properties' element={
            <ProtectedRoutes>
              <LandLordProperties />
            </ProtectedRoutes>
          } />
          <Route path='/landlord/reports' element={
            <ProtectedRoutes>
              <LandLordReport />
            </ProtectedRoutes>
          } />
          <Route path='/landlord/reports/:user_id' element={
            <ProtectedRoutes>
              <LandlordProfile />
            </ProtectedRoutes>
          } />
          <Route path='/landlord/properties/add' element={
            <ProtectedRoutes>
              <AddProperty />
            </ProtectedRoutes>
          } />
          <Route path='/landlord/properties/edit/:slug_name' element={
            <ProtectedRoutes>
              <PropertyEdit />
            </ProtectedRoutes>
          } />
          <Route path='/landlord/properties/:slug_name' element={
            <ProtectedRoutes>
              <PropertyView />
            </ProtectedRoutes>
          } />
          <Route path='/admin/dashboard' element={
            <ProtectedRoutes>
              <AdminDashboard />
            </ProtectedRoutes>
          } />
          <Route path='/admin/manage/properties' element={
            <ProtectedRoutes>
              <AdminPropertyManagement />
            </ProtectedRoutes>
          } />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  )
}

export default App
