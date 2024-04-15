import { useContext, useEffect } from "react"
import { useFetch } from "../../hooks/useFetch"
import { CarritoContext } from "../../contexts/CarritoContext"
import { MensajeContext } from "../../contexts/MensajeContext"

export default function ProductoCarrito ({ id_producto, precio, color, talla, cantidad, resumen }) {
    const { VITE_API_HOST } = import.meta.env

    const carritoContext = useContext(CarritoContext)
    const mensajeContexto = useContext(MensajeContext)

    const [ data ] = useFetch(`/productos/id/${id_producto}`)

    const borrarProductoDelCarrito = () => {
        const posicion_producto = carritoContext[0].findIndex(p => p.id_producto === id_producto && p.color === color && p.talla === talla)
        if (cantidad > 1) {
            carritoContext[0][posicion_producto].cantidad--
            carritoContext[1](carritoContext[0])
            localStorage.setItem("productos_carrito", JSON.stringify(carritoContext[0]))
        } else {
            if (carritoContext[0].length === 1) {
                carritoContext[1]([])
                localStorage.clear()
            } else {
                carritoContext[0].splice(posicion_producto, 1)
                carritoContext[1](carritoContext[0])
                localStorage.setItem("productos_carrito", JSON.stringify(carritoContext[0]))
            }
        }

        mensajeContexto[1]("producto eliminado correctamente")
    }

    return (
        <div className="carrito__productos__producto">
            <div className="carrito__productos__producto__imagen">
                <div className="carrito__cuadro__imagen">
                    <img className={color === 'plata' && 'producto_plata'} style={ resumen && {height: "70%"} } src={`${VITE_API_HOST}/public/${data?.results.imagen}`} />
                </div>
                <div className="carrito__producto__cantidad">
                    x{cantidad}
                </div>
            </div>
            <div className="carrito__productos__producto__informacion">
                <h2>{data?.results.titulo}</h2>
                <div className="carrito__producto__caracteristicas">
                    <div className={`caracteristicas__color ${color === 'oro' ? 'oro' : 'plata'}`}></div>
                    { talla && <p className="caracteristicas__talla">{talla}</p> }
                </div>
                <h4>{(precio * cantidad) / 100}€</h4>
            </div>
            {
                !resumen &&
                    <div className="carrito__productos__producto__borrar">
                        <button className="boton" onClick={borrarProductoDelCarrito}><i className="fa-solid fa-trash"></i></button>
                    </div>
            }
        </div>
    )
}