import "./SideMenu.css"

const SideMenu = ({guias,generar,registrar}) => {
    return (
        <div className="sidemenu-container">
            
                <p className="list-item"
                onClick={()=>{
                    guias()
                }}
                >Guías</p>
            
                <p className="list-item"
                onClick={()=>{
                    generar()
                }}
                >Generar reporte</p>
            
                <p className="list-item"
                onClick={()=>{
                    registrar()
                }}
                >Registrar guía</p>
            
        </div>
    )
}

export default SideMenu
