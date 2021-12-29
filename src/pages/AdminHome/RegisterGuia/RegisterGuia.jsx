import { RegisterTextField } from "../../../components/TextField"
import { RegisterGuiaButton } from "../../../components/Buttons"
import { MenuItem } from "@mui/material"
import { Alert, Zoom } from "@mui/material"
import "./RegisterGuia.css"
import { useState, useEffect } from "react"
import Select from "../../../components/Select"
import { guias } from "../../../db-conn/guides/getAllGuias"

const RegisterGuia = () => {

    const [error, setError] = useState(false)
    const [primerNombre, setPrimerNombre] = useState("");
    const [segundoNombre, setSegundoNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [horasRealizadas, setHorasRealizadas] = useState("");
    const [prestacion, setPrestacion] = useState("");
    const [turno, setTurno] = useState("");
    const [servicio, setServicio] = useState("");
    const [genero, setGenero] = useState("");
    const [data, setData] = useState([])
    const [generatedID, setGeneratedID] = useState("")
    const regex = /^\d*\.?\d*$/;

    const handlePrestacion = (e) => setPrestacion(e.target.value);
    const handleTurno = (e) => setTurno(e.target.value);
    const handleServicio = (e) => setServicio(e.target.value);
    const handleGenero = (e) => setGenero(e.target.value);

    useEffect(() => {
        async function getData() {
            setData(await guias())
        }
        getData();
      }, [])

    const generateId = async (a,b,c) => {
        const id = data[data.length-1].idGuia;
        const number = parseInt(id.substring(3)); 
        const finalID = a.charAt(0).toUpperCase()+b.charAt(0).toUpperCase()+c.charAt(0).toUpperCase()+number;
        return finalID
    }

    const handleRegistrar = () => {
        if (primerNombre === "" || apellidoPaterno === "" || apellidoMaterno === "" || prestacion === "" || turno === "" || servicio === "" || genero === "" || horasRealizadas === "" || horasRealizadas === "." ) {
            setError(true)
        } else {
            if (horasRealizadas.indexOf(".") === horasRealizadas.length-1) {
                setHorasRealizadas(horasRealizadas.slice(0, -1))
            }
            setError(false)
            //setGeneratedID(generateId(primerNombre,apellidoPaterno,apellidoMaterno))
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
                        <RegisterTextField
                            error={error}
                            autoComplete="off"
                            value={horasRealizadas}
                            onInput={(e)=>{
                            if (regex.test(e.target.value)) {
                                setHorasRealizadas(e.target.value)
                            }
                            }}
                            label="Horas realizadas"
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
                            Rellene los campos obligatorios
                        </Alert>
                    }
                    </Zoom>
                    : ""
                }
                <RegisterGuiaButton
                    onClick={()=>{
                        handleRegistrar()
                        setGeneratedID("ASD4")
                        console.log("ID",generatedID);
                    }}
                >
                    Registrar
                </RegisterGuiaButton>
            </div>
        </div>
    )
}

export default RegisterGuia
