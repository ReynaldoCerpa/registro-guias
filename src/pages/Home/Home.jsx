import "./Home.css"
import { useNavigate } from 'react-router-dom'
import { FiLogIn } from "react-icons/fi"
import { Alert, Zoom } from "@mui/material"
import { useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import { TextField } from "../../components/TextField"

const Home = () => {

    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("Datos incorrectos")
    const [id, setId] = useState("")
    const nav = useNavigate();

    const handleSubmit = (id) => {
        setError(false)
        if (id === "" || id.length > 20) {
            setError(true)
            setErrorMsg("Ingrese ID válido")
        }
    }
    
    // let time = new Date();
    // let date = new Date();
    // console.log(
    //     date.toLocaleDateString('es-MX'),
    //     time.toLocaleString('es-MX', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })
    // );

    return (
        <div>
            <Navbar Icon={FiLogIn} text={"INICIAR SESION"}
            action={() => {
                nav("/login")
            }}
            />
            <div className="enter-id-items">
                <h1>Ingrese su ID</h1>
                <TextField
                    error={error}
                    autoComplete="off"
                    label="ID"
                    value={id}
                    onInput={e => {
                        if (!regex.test(e.target.value) && e.target.value.length < 15 && e.target.value.indexOf(" ") === -1) {
                            setId(e.target.value.toUpperCase())
                        }
                    }}
                    onKeyDown={(e)=>{
                        if (e.key === "Enter") {
                            handleSubmit(e.target.value)
                        }
                    }}
                />
                <p className="lower-label">Presione Enter para registrar la hora de ingreso/salida</p>
                {error ?
                    <Zoom in={error}>
                    {
                        <Alert 
                        style={{margin: "1rem"}}
                        severity="error">
                        {errorMsg}
                        </Alert>
                    }
                    </Zoom>
                    : ""
                }
            </div>
        </div>
    )
}

export default Home
