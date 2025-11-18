import './App.css'
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Home from './pages/Home'
import 'leaflet/dist/leaflet.css';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
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
