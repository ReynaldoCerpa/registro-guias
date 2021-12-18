import { FaHome } from "react-icons/fa"
import { NavButton } from "../Buttons"

import "./Navbar.css"

const Navbar = () => {
    
    return (
        <div className="navbar-container">
            <div className="navbar-items">
                <img src="/assets/logo-blanco.png" alt="Logo caracol" height={50}/>
                <NavButton
                variant="contained"
                >
                <FaHome style={{marginRight: 5}} />
                Inicio</NavButton>
            </div>
        </div>
    )
}

export default Navbar
