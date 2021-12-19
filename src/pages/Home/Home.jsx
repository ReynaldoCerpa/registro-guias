import { useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import { TextField } from "../../components/TextField"

const Home = () => {
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const [id, setId] = useState("")

    return (
        <div>
            <Navbar/>
            <h1>Ingrese su matrícula</h1>
            <TextField
            label="Matrícula"
            value={id}
            onInput={e => {
                if (!regex.test(e.target.value)) {
                    console.log(!regex.test(e.target.value));
                    setId(e.target.value.toUpperCase())
                }
            }}
            />
        </div>
    )
}

export default Home
