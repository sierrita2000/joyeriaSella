import { useNavigate } from "react-router-dom"

export default function Categoria ({ titulo, imagen, loading }) {

    const { VITE_API_HOST } = import.meta.env
    const navigate = useNavigate()

    return (
        <div className="categorias__categoria" onClick={() => navigate(`/${titulo.toLowerCase()}`)} >
            <h2>{titulo}</h2>
            { loading ? <p>Cargando...</p> : <img className={`categoria__imagen ${titulo === "PULSERAS" ? 'producto_plata': titulo === "COLLARES" ? 'img_collares' : ''}`} src={`${VITE_API_HOST}/public/${imagen}`} /> }
        </div>
    )
}