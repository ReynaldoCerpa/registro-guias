import "./Home.css"
import { useNavigate } from 'react-router-dom'
import { FiLogIn } from "react-icons/fi"
import { Alert, Zoom } from "@mui/material"
import { useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from "../../components/TextField"
import { checkTime } from "./checkTime"

const Home = () => {

    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const [error, setError] = useState(false)
    const [alert, setAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("Datos incorrectos")
    const [id, setId] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const handleSubmit = async (id) => {
        setError(false)
        setAlert(false)
        setLoading(true)
        if (id === "" || id.length > 20) {
            setError(true)
            setErrorMsg("Ingrese ID válido")
            setLoading(false)
        } else {
            setDisabled(true)
            if (!disabled) {
                let msg = await checkTime(id)
                if (!msg[0]) {
                    setError(true)
                    setErrorMsg(msg[1])
                    setLoading(false)
                } else {
                    setAlert(true)
                    setAlertMsg(msg[1])
                    setLoading(false)
                }
                console.log(msg);
            }
            setTimeout(() => {
                setDisabled(false) //prevents user spamming ids
                setId("")
            }, 1000);
            setTimeout(() => {
                setAlert(false)
            }, 10000);
        }
    }

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
                    disabled={disabled}
                    value={id}
                    onInput={e => {
                        if (!regex.test(e.target.value) && e.target.value.length < 15 && e.target.value.indexOf(" ") === -1) {
                            setId(e.target.value.toUpperCase())
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit(e.target.value)
                        }
                    }}
                />
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            position: 'absolute',
                            marginTop: '6.35rem',
                        }}
                    />
                )}
                <p className="lower-label">Presione Enter para registrar la hora de ingreso/salida</p>
                {error ?
                    <Zoom in={error}>
                        {
                            <Alert
                                style={{ margin: "1rem" }}
                                severity="error">
                                {errorMsg}
                            </Alert>
                        }
                    </Zoom>
                    : ""
                }
                {alert ?
                    <Zoom in={alert}>
                        {
                            <Alert
                                style={{
                                    margin: "1rem",
                                    maxWidth: "15rem",
                                    overflowWrap: "break-word"
                                }}
                                severity="success">
                                {alertMsg}
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
