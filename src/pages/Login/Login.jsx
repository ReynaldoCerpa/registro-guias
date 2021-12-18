import { LoginButton } from "../../components/Buttons"
import Navbar from "../../components/Navbar/Navbar"
import { TextField } from "../../components/TextField"

const Login = () => {
    return (
        <div>
            <Navbar />
            <h1>Inicie sesión</h1>
            <TextField
                label="Usuario"
            />
            <TextField
                label="Contraseña"
                type="password"
            />
            <LoginButton
            variant="contained"
            >Iniciar sesión</LoginButton>
        </div>
    )
}

export default Login
