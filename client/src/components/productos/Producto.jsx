import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Colores from "./Colores"

export default function Producto ({ _id, titulo, descripcion, precio, descuento, imagen, categoria, stock, material }) {
    const { VITE_API_HOST } = import.meta.env
    const navigate = useNavigate()

    const [ color, setColor ] = useState('oro')

    const calcularPrecio = (centimos) => {
        let euros =  centimos / 100
        if (descuento > 0) euros = Number((euros * ((100 - descuento) / 100)).toFixed(2))
        return euros
    }

    useEffect(() => {
        material && setColor(material)
    }, [material])

    return (
        <div className="producto">
            <div className="producto__producto" onClick={() => navigate(`/producto/${_id}/${color}`)}>
                <div className={`producto__imagen ${categoria === 'collar' ? 'producto__imagen__collar' : ''}`}>
                    <img className={color === 'oro' ? '' : 'producto_plata'} src={`${VITE_API_HOST}/public/${imagen}`} alt="foto no disponible" />
                </div>
                <div className="producto__informacion">
                    <h2>{titulo}</h2>
                    <p>{descripcion}</p>
                    <div className="producto__informacion__precio">
                        {
                            (descuento > 0) &&
                            <>
                                <h4 className="precio_sin_descuento">{precio/100}€</h4>
                                <i className="fa-solid fa-arrow-right"></i>
                            </>
                        }
                        <h4>{calcularPrecio(precio)}€</h4>
                    </div>
                </div>
                {
                    stock < 1 && (
                        <div className="mensaje_agotado">AGOTADO</div>
                    )
                }
            </div>
            <div className="producto__precio">
                        {
                            (descuento > 0) &&
                            <>
                                <h4 className="precio_sin_descuento">{precio/100}€</h4>
                                <i className="fa-solid fa-arrow-right"></i>
                            </>
                        }
                        <h4>{calcularPrecio(precio)}€</h4>
            </div>
            {
                (descuento > 0) &&
                    <div className="producto__descuento">
                        <p>{descuento} %</p>
                    </div>
            }
            {
                !material && (
                    <Colores color={color} setColor={setColor} />
                )
            }
        </div>
    )
}