import { useEffect, useState } from "react"
import { useFetch } from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"

export default function HeroImage () {

    const { VITE_API_HOST } = import.meta.env
    const navigate = useNavigate()

    const [ color, setColor ] = useState('oro')

    const [ dataAnillo ] = useFetch("/productos/anillo-random")

    useEffect(() => {
        (Math.floor(Math.random() * 2) === 0) ? setColor('oro') : setColor('plata')
    }, [])

    return (
        <section className="inicio__hero_image">
                <div className="presentacion__izquierda">
                    <img src="../../sella_logo.png" alt="no-logo" />
                    <h1>SELLA</h1>
                    <h2>brillando con elegancia en cada ocasión</h2>
                </div>
                <div className="presentacion__derecha">
                    <div className="presentacion__derecha__tubo">
                        <div className="presentacion__derecha__tubo__imagen">
                            <img className="tubo" src="../../tubo_inicio.png" />
                            <img src={`${VITE_API_HOST}/public/${dataAnillo?.results.imagen}`} className={`anillo ${color === 'plata' ? 'producto_plata' : ''}`} onClick={() => navigate(`/producto/${dataAnillo.results._id}/${color}`)} />
                        </div>
                        <div className="presentacion__derecha__tubo__border"></div>
                    </div>
                    <div className="presentacion__derecha__sombra"></div>
                </div>
        </section>
    )
} 