import "./AdminHome.css"
import Navbar from "../../components/Navbar/Navbar"
import { useNavigate } from 'react-router-dom'
import SideMenu from "../../components/SideMenu/SideMenu";
import { useState } from "react";
import RegisterGuia from "./RegisterGuia/RegisterGuia";
import Guias from "./Guias/Guias";
import Reportes from "./Reporte/Reportes";

const AdminHome = () => {

    const [guias, setGuias] = useState(true)
    const [generar, setGenerar] = useState(false)
    const [registrar, setRegistrar] = useState(false)

    function clickGuias(){
        setGuias(true)
        setGenerar(false)
        setRegistrar(false)
    }
    function clickGenerar(){
        setGuias(false)
        setGenerar(true)
        setRegistrar(false)
    }
    function clickRegistrar(){
        setGuias(false)
        setGenerar(false)
        setRegistrar(true)
    }

    const nav = useNavigate();

    return (
        <div>
            <Navbar isAdminPage={true}
            action={()=>{
                nav("/")
            }}
            />
            <div className="adminhome-container">
                <SideMenu guias={clickGuias} generar={clickGenerar} registrar={clickRegistrar} />
                <div className="content-container">
                    {guias ? <Guias/> : null}
                    {generar ? <Reportes/> : null}
                    {registrar ? <RegisterGuia/> : null}
                </div>
            </div>
        </div>
    )
}

export default AdminHome
