import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";
import BotonNavegacion from "../Navegacion/BotonNavegacion";
import { useContext, useEffect, useState } from "react";
import UsuarioCarrito from "../../pages/UsuarioCarrito";
import { MensajeContext } from "../../contexts/MensajeContext";
import ModalMensaje from "../ModalMensaje/ModalMensaje";
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { CarritoContext } from "../../contexts/CarritoContext";

export default function MenuCabecera () {

    const usuarioContext = useContext(UsuarioContext)

    const [ panelAbierto, setPanelAbierto ] = useState(null)
    const [ productosCarrito, setProductosCarrito ] = useState([])
    const [ mensaje, setMensaje ] = useState("")

    const cantidadProductosEnCarrito = () => {
        let cantidad_productos = 0

        productosCarrito.forEach(producto => {
            cantidad_productos += producto.cantidad
        })

        return cantidad_productos
    }

    const abrirMenu = () => {
        const botones_menu = document.querySelectorAll('.inicio__hero_image__cabecera ul .boton_menu')
        botones_menu.forEach(elemento => {
            elemento.classList.toggle('menu_desplegado')
        })
        const menu = document.querySelector('.inicio__hero_image__cabecera ul')
        menu.classList.toggle('menu_menu_desplegado')
        const boton_hamburguesa = document.querySelector('.inicio__hero_image__cabecera ul .boton_hamburguesa i')
        boton_hamburguesa.classList.toggle('fa-bars')
        boton_hamburguesa.classList.toggle('fa-xmark')
    }

    useEffect(() => {
        const productos = JSON.parse(localStorage.getItem("productos_carrito"))
        productos && setProductosCarrito(productos)
    }, [])

    return (
        <CarritoContext.Provider value={[ productosCarrito, setProductosCarrito ]} >
            <MensajeContext.Provider value={[ mensaje, setMensaje ]}>
                <div className="inicio__hero_image__cabecera">
                    <ul>
                        <li><Link to="/" className="boton boton_nav"><img src="../../sella_logo.png" /></Link></li>
                        <li className="boton_hamburguesa" onClick={abrirMenu}><i className="fa-solid fa-bars"></i></li>
                        <li className="boton_menu"><BotonNavegacion categoria="COLLARES" abrirMenu={abrirMenu} /></li>
                        <li className="boton_menu"><BotonNavegacion categoria="PULSERAS" abrirMenu={abrirMenu} /></li>
                        <li className="boton_menu"><BotonNavegacion categoria="ANILLOS" abrirMenu={abrirMenu} /></li>
                    </ul>
                    <div className="cabecera__botones">
                        { usuarioContext[0] && <Link className="cabecera__botones__link" to={`/compras/${usuarioContext[0]?._id}`}><p className="cabecera__botones__mis_compras">MIS COMPRAS</p></Link> }
                        <div className="cabecera__botones__boton_usuario">
                            <button title="LOG IN" className="boton boton_nav" onClick={() => setPanelAbierto('usuario')} ><i className="fa-solid fa-user"></i></button>
                            { usuarioContext[0] && <div className="boton_usuario__online_circulo"></div> }
                        </div>
                        <div className="cabecera__botones__boton_carro">
                            <button title="carrito" className="boton boton_nav" onClick={() => setPanelAbierto('carrito')} ><i className="fa-solid fa-basket-shopping"></i></button>
                            { productosCarrito.length > 0 && <div className="boton_carro__cantidad_productos" >{cantidadProductosEnCarrito()}</div> }
                        </div>
                    </div>
                </div>
                <Outlet context={{ setPanelAbierto }} />
                <Footer />
                {
                    panelAbierto && (
                        <UsuarioCarrito panelAbierto={panelAbierto} setPanelAbierto={setPanelAbierto} />
                    )
                }
                {
                    mensaje && (
                        <>
                            <ModalMensaje mensaje={mensaje} />
                            {
                                setTimeout(() => {
                                    setMensaje("")
                                }, 5000)
                            }
                        </>
                    )
                }
            </MensajeContext.Provider>
        </CarritoContext.Provider>
    )
}