import "./Navbar.css"
import { NavButton, SignOutButton, SignOutIcon } from "../Buttons"
import Tooltip from '@mui/material/Tooltip';

const Navbar = ({Icon, text, action, variant, isAdminPage}) => {

    return (
        <div className="navbar-container">
            <div className="navbar-items">
                <img src="/assets/logo-blanco.png" alt="Logo caracol" height={50}/>
{/*                 {isAdminPage ?
                    <Tooltip title="Cerrar sesión" placement="left" arrow>
                        <SignOutButton
                        onClick={()=>{
                            action ? action() : console.log("No action provided");
                        }}
                        >
                            <SignOutIcon/>
                        </SignOutButton>
                    </Tooltip>
                :
                    <NavButton
                    variant={variant}
                    onClick={()=>{
                        action ? action() : console.log("No action provided");
                    }}
                    >
                    { Icon ? <Icon style={{marginRight: 10}} /> : null}
                    {text}</NavButton>
                } */}
            </div>
        </div>
    )
}

Navbar.defaultProps = {
    text: "Button",
    variant: "contained",
    isAdminPage: false
}

export default Navbar
