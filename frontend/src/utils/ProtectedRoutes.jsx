import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const ProtectedRoutes = ({ children }) => {
    const navigate = useNavigate()

    const access_token = localStorage.getItem('access_token')
    
    useEffect(() => {
        if (!access_token) {
            navigate('/')
        }
    }, [access_token, navigate])


    return children
}

export default ProtectedRoutes