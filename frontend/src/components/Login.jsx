import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "src/utils/api"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const LoginHandler = async (e) => {
        e.preventDefault()

        const data = {
            "username": username,
            "password": password
        }

        const res = await api.post('token/', data)
        localStorage.setItem("access_token",res.data.access)
        localStorage.setItem("refresh_token", res.data.refresh)
        navigate('/home')
    }

    return (
        <div>
            <h1>Login form</h1>


            <form onSubmit={LoginHandler}>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username..."
                />
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password..."
                />

                <button>submit</button>
            </form>


        </div>
    )
}

export default Login