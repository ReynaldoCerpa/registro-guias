import "./AdminHome.css"
import Navbar from "../../components/Navbar/Navbar"
import { useNavigate } from 'react-router-dom'
import SideMenu from "../../components/SideMenu/SideMenu";

const AdminHome = () => {

    const nav = useNavigate();

    return (
        <div>
            <Navbar isAdminPage={true}
            action={()=>{
                nav("/")
            }}
            />
            <div className="adminhome-container">
                <SideMenu/>
            </div>
        </div>
    )
}

export default AdminHome
