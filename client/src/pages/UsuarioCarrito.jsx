import { useContext } from "react"
import LoginSignup from "../components/Usuario/LoginSignup"
import Carrito from "../components/Carrito/Carrito"
import { UsuarioContext } from "../contexts/UsuarioContext"
import DatosUsuario from "../components/Usuario/DatosUsuario"

export default function UsuarioCarrito ({ panelAbierto, setPanelAbierto }) {

    const usuarioContext = useContext(UsuarioContext)

    const cerrarPanel = () => {
        document.querySelector('.usuario_carrito').animate([{right: "-24rem", offset: 1}], {duration: 400, easing: "ease-in-out", fill: "forwards"})
        setTimeout(() => setPanelAbierto(null), 400)
    }

    return (
        <div className="usuario_carrito">
            <button className="boton usuario_carrito__boton__cerrar" onClick={() => cerrarPanel()} ><i className="fa-solid fa-xmark"></i></button>
            {
                panelAbierto === "usuario" ? (
                    usuarioContext[0] ? <DatosUsuario cerrarPanel={cerrarPanel} /> : <LoginSignup />
                ): (
                    <Carrito cerrarPanel={cerrarPanel} />
                )
            }
        </div> 
    )
}