import { RegisterTextField } from "../../../components/TextField"
import { RegisterGuiaButton } from "../../../components/Buttons"
import { MenuItem } from "@mui/material"
import { Alert, Zoom, TextField } from "@mui/material"
import "./RegisterGuia.css"
import { useState, useEffect } from "react"
import Select from "../../../components/Select"
import { guias } from "../../../db-conn/guides/getAllGuias"
import { formatDate } from "../../../utils/formatDate"
import DatePicker from "@mui/lab/DatePicker"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import es from "date-fns/locale/es/index.js"
import { registerGuide } from "../../../db-conn/guides/registerGuide"
import CircularProgress from '@mui/material/CircularProgress';

const RegisterGuia = () => {

    const [alert, setAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState("")
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("Datos incorrectos")
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
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(false)
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

    const generateId = (a,b,c) => {
        let finalID;
        if (data.length !== 0) {
            const id = data[0].idGuia;
            const number = parseInt(id.substring(3)); 
            finalID = a.charAt(0).toUpperCase()+b.charAt(0).toUpperCase()+c.charAt(0).toUpperCase()+(number+1);
        } else {
            finalID = a.charAt(0).toUpperCase()+b.charAt(0).toUpperCase()+c.charAt(0).toUpperCase()+1;
        }
        return finalID
    }

    const handleRegistrar = async () => {
        setAlert(false)
        if (primerNombre === "" || apellidoPaterno === "" || apellidoMaterno === "" || prestacion === "" || turno === "" || servicio === "" || genero === "" || horasRealizadas === "" || horasRealizadas === "." || formatDate(date) == "invalid") {
            setError(true)
            setDate("00/00/0000")
            setErrorMsg("Rellene los campos obligatorios")
        } else {
            if (horasRealizadas.indexOf(".") === horasRealizadas.length-1) {
                setHorasRealizadas(horasRealizadas.slice(0, -1))
            }
            setError(false)

            let data = {
                idGuia: generateId(primerNombre,apellidoPaterno,apellidoMaterno),
                nombre1: primerNombre,
                nombre2: segundoNombre,
                apellidoPaterno: apellidoPaterno,
                apellidoMaterno: apellidoMaterno,
                prestacion: prestacion,
                fechaNacimiento: formatDate(date),
                turno: turno,
                servicio: servicio,
                horasRealizadas: horasRealizadas,
                genero: genero,
            }
            setLoading(true)
            const res = await registerGuide(data)
            if (res[0]) {
                setAlert(true)
                setAlertMsg("Guía registrado con éxito")
                setLoading(false)
                setData(await guias())
            } else {
                setError(true)
                setErrorMsg(res[1])
                setLoading(false)
            }
        }
    }

    const localeMap = {
        es: es,
    };
      
    const maskMap = {
        es: '__/__/____',
    };

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
                    </div>
                    <div className="textInput-items">
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
                    <div className="textInput-items">
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap["es"]}>
                            <DatePicker
                                label="Fecha de nacimiento"
                                mask={maskMap["es"]}
                                value={date}
                                onChange={(e) => {
                                setDate(e);
                                }}
                                renderInput={(params) => <RegisterTextField {...params} />}
                            />
                        </LocalizationProvider>
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
                                <MenuItem key={"Mixto"} value={"Mixto"}>Mixto</MenuItem>,
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
                                <MenuItem key={"Alta"} value={"Alta"}>Alta</MenuItem>,
                                <MenuItem key={"Liberado"} value={"Liberado"}>Liberado</MenuItem>,
                                <MenuItem key={"Baja"} value={"Baja"}>Baja</MenuItem>
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
                <RegisterGuiaButton
                    disabled={loading}
                    onClick={()=>{
                        handleRegistrar()
                    }}
                >
                    Registrar
                </RegisterGuiaButton>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            position: 'absolute',
                            marginTop: '27.3rem',
                            color: "white"
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default RegisterGuia
