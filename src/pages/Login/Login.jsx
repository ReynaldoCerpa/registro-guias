import "./Login.css"
import { FaHome } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { LoginButton } from "../../components/Buttons"
import Navbar from "../../components/Navbar/Navbar"
import { TextField } from "../../components/TextField"
import { useState } from "react"
import { Alert, Zoom } from "@mui/material"
import { logIn } from '../../db-conn/login';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("Datos incorrectos")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const handleSubmit = async (username, password) => {
        setError(false)
        setLoading(true)
        if (username.length > 35 || password.length > 35) {
            setError(true)
            setLoading(false)
        }
        if (username.length === 0 || password.length === 0) {
            setErrorMsg("Ambos campos son obligatorios")
            setError(true)
            setLoading(false)
        } else {
            const response = await logIn(username, password)
            if (!response[0]){
                setError(true)
                setErrorMsg(response[1])
                setLoading(false)
            }
            else{
                setLoading(false)
                localStorage.setItem("token", response[1])
                nav("/adminHome")
            }
        }
    }

    return (
        <div>
            <Navbar Icon={FaHome} text={"INICIO"} 
            action={() => {
                nav("/")
            }}
            />

            <div className="login-items">
                <h1>Inicie sesión</h1>
                <TextField
                    error={error}
                    disabled={loading}
                    value={username}
                    onInput={e => e.target.value.length < 35 ? setUsername(e.target.value) : username}
                    onKeyDown={(e)=>{
                        if (e.key === "Enter") {
                            handleSubmit(username, password)
                        }
                    }}
                    label="Usuario"
                />
                <TextField
                    error={error}
                    value={password}
                    disabled={loading}
                    onInput={e => e.target.value.length < 35 ? setPassword(e.target.value) : password}
                    onKeyDown={(e)=>{
                        if (e.key === "Enter") {
                            handleSubmit(username, password)
                        }
                    }}
                    label="Contraseña"
                    type="password"
                />
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            position: 'absolute',
                            marginTop: '15.5rem',
                        }}
                    />
                )} 
                {error ?
                    <Zoom in={error}>
                    {
                        <Alert severity="error">
                        {errorMsg}
                        </Alert>
                    }
                    </Zoom>
                    : ""
                }
                <LoginButton
                variant="contained"
                disabled={loading}
                onClick={()=>{handleSubmit(username, password)}}
                >Iniciar sesión</LoginButton>
            </div>
        </div>
    )
}

export default Login
