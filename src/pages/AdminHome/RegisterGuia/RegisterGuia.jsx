import { RegisterTextField } from "../../../components/TextField"
import { RegisterGuiaButton } from "../../../components/Buttons"
import { MenuItem } from "@mui/material"
import { Alert, Zoom } from "@mui/material"
import "./RegisterGuia.css"
import { useState } from "react"
import Select from "../../../components/Select"

const RegisterGuia = () => {

    const [error, setError] = useState(false)
    const [primerNombre, setPrimerNombre] = useState("");
    const [segundoNombre, setSegundoNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [prestacion, setPrestacion] = useState("");
    const [turno, setTurno] = useState("");
    const [servicio, setServicio] = useState("");
    const [genero, setGenero] = useState("");

    const handlePrestacion = (e) => setPrestacion(e.target.value);
    const handleTurno = (e) => setTurno(e.target.value);
    const handleServicio = (e) => setServicio(e.target.value);
    const handleGenero = (e) => setGenero(e.target.value);

    const handleRegistrar = () => {
        if (primerNombre === "" || apellidoPaterno === "" || apellidoMaterno === "" || prestacion === "" || turno === "" || servicio === "" || genero === "") {
            setError(true)
        } else {
            setError(false)
        }
    }

    return (
        <div className="register-container">
            <div className="register-items">
                <h1 style={{ margin: "0.5rem" }}>Registrar guía</h1>
                <form>
                    <div className="textInput-items">
                        <RegisterTextField
                            error={error}
                            autoComplete="off"
                            value={primerNombre}
                            onInput={(e)=>setPrimerNombre(e.target.value)}
                            label="Primer nombre"
                        />
                        <RegisterTextField
                            autoComplete="off"
                            value={segundoNombre}
                            onInput={(e)=>setSegundoNombre(e.target.value)}
                            label="Segundo nombre (Opcional)"
                        />
                        <RegisterTextField
                            error={error}
                            autoComplete="off"
                            value={apellidoPaterno}
                            onInput={(e)=>setApellidoPaterno(e.target.value)}
                            label="Apellido paterno"
                        />
                        <RegisterTextField
                            error={error}
                            autoComplete="off"
                            value={apellidoMaterno}
                            onInput={(e)=>setApellidoMaterno(e.target.value)}
                            label="Apellido materno"
                        />
                    </div>
                    <div className="select-items">
                        <Select
                        error={error}
                            title="Prestación"
                            width="8rem"
                            value={prestacion}
                            handler={handlePrestacion}
                            items={[
                                <MenuItem key={"S.S.C."} value={"S.S.C."}>S.S.C.</MenuItem>,
                                <MenuItem key={"S.S.P."} value={"S.S.P."}>S.S.P.</MenuItem>,
                                <MenuItem key={"P.P."} value={"P.P."}>P.P.</MenuItem>
                            ]}
                        />
                        <Select
                        error={error}
                            title="Turno"
                            width="8rem"
                            value={turno}
                            handler={handleTurno}
                            items={[
                                <MenuItem key={"Matutino"} value={"Matutino"}>Matutino</MenuItem>,
                                <MenuItem key={"Vespertino"} value={"Vespertino"}>Vespertino</MenuItem>,
                            ]}
                        />
                    </div>
                    <div className="select-items">
                        <Select
                        error={error}
                            title="Servicio"
                            width="8rem"
                            value={servicio}
                            handler={handleServicio}
                            items={[
                                <MenuItem key={"Liberado"} value={"Liberado"}>Liberado</MenuItem>,
                                <MenuItem key={"Baja"} value={"Baja"}>Baja</MenuItem>,
                                <MenuItem key={"Alta"} value={"Alta"}>Alta</MenuItem>
                            ]}
                        />
                        <Select
                        error={error}
                            title="Género"
                            width="8rem"
                            value={genero}
                            handler={handleGenero}
                            items={[
                                <MenuItem key={"H"} value={"H"}>H</MenuItem>,
                                <MenuItem key={"M"} value={"M"}>M</MenuItem>,
                            ]}
                        />
                    </div>
                </form>
                {error ?
                    <Zoom in={error}>
                    {
                        <Alert severity="error">
                        Todos los campos son obligatorios
                        </Alert>
                    }
                    </Zoom>
                    : ""
                }
                <RegisterGuiaButton
                onClick={handleRegistrar}
                >
                    Registrar
                </RegisterGuiaButton>
            </div>
        </div>
    )
}

{/* 
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
*/}

export default RegisterGuia
