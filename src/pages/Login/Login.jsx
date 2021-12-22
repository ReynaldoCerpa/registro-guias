import "./Login.css"
import { FaHome } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { LoginButton } from "../../components/Buttons"
import Navbar from "../../components/Navbar/Navbar"
import { TextField } from "../../components/TextField"
import { useState } from "react"
import { Alert, Zoom } from "@mui/material"
import {logIn} from '../../db-conn/login';
import Cookies from "universal-cookie"

const cookie = new Cookies();
const Login = () => {
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("Datos incorrectos")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const nav = useNavigate();

    const handleSubmit = async (username, password) => {
        setError(false)
        if (username.length > 35 || password.length > 35) {
            setError(true)
        }
        if (username.length === 0 || password.length === 0) {
            setErrorMsg("Ambos campos son obligatorios")
            setError(true)
        }
        const response = await logIn(username, password)
        if (response == null) console.log("No se pudo iniciar sesion")
        else{
            cookie.set("user", `${response}`) 
            nav("/adminHome")
            
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
                    onInput={e => e.target.value.length < 35 ? setPassword(e.target.value) : password}
                    onKeyDown={(e)=>{
                        if (e.key === "Enter") {
                            handleSubmit(username, password)
                        }
                    }}
                    label="Contraseña"
                    type="password"
                />
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
                onClick={()=>{handleSubmit(username, password)}}
                >Iniciar sesión</LoginButton>
            </div>
        </div>
    )
}

export default Login
