import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Home from './pages/Home'
import 'leaflet/dist/leaflet.css';


function App() {

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-100 text-black'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<Register />}/>
          <Route path='/home' element={
            <ProtectedRoutes>
              <Home/>
            </ProtectedRoutes>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
