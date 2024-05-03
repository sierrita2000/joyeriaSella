import { Link, useNavigate } from "react-router-dom"

export default function BotonNavegacion ({ categoria, abrirMenu}) {

    const navigate = useNavigate()

    /**
     * Cierra el menú.
     */
    const cerrarMenu = () => {
        const botones_menu = document.querySelectorAll('.inicio__hero_image__cabecera ul .boton_menu')
        botones_menu.forEach(elemento => {
            elemento.classList.remove('menu_desplegado')
        })
        const menu = document.querySelector('.inicio__hero_image__cabecera ul')
        menu.classList.remove('menu_menu_desplegado')
        const boton_hamburguesa = document.querySelector('.inicio__hero_image__cabecera ul .boton_hamburguesa i')
        boton_hamburguesa.classList.add('fa-bars')
        boton_hamburguesa.classList.remove('fa-xmark')
    }

    return (
        <div className="boton_navegacion">
            <p onClick={() => { navigate(`/${categoria.toLowerCase()}`); cerrarMenu() }}>
                {categoria}
            </p>
            <div className="boton_navegacion__opciones">
                <Link to={`/${categoria.toLowerCase()}`} className="opcion_nav"> TODOS </Link>
                <Link to={`/${categoria.toLowerCase()}/oro`} className="opcion_nav"> ORO </Link>
                <Link to={`/${categoria.toLowerCase()}/plata`} className="opcion_nav"> PLATA </Link>
            </div>
        </div>
    )
}