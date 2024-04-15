import { Link, useNavigate } from "react-router-dom"

export default function BotonNavegacion ({ categoria, abrirMenu}) {

    const navigate = useNavigate()

    return (
        <div className="boton_navegacion">
            <p onClick={() => { navigate(`/${categoria.toLowerCase()}`); abrirMenu() }}>
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