import { useContext, useState } from "react"
import { useLoaderData, useParams, useOutletContext } from "react-router-dom"
import Colores from "../components/productos/Colores"
import { CarritoContext } from "../contexts/CarritoContext"
import { MensajeContext } from "../contexts/MensajeContext"
import { useFetch } from "../hooks/useFetch"

const { VITE_API_HOST } = import.meta.env

export const loader = async ({ params }) => {
    const response = await fetch(`${VITE_API_HOST}/productos/id/${params.id}`)
    const data = await response.json()

    if (data.status === 'ok') return data.results
    else return data
}

export default function ProductoIndividual () {

    const carritoContext = useContext(CarritoContext)
    const mensajeContext = useContext(MensajeContext)

    const [ color, setColor ] = useState(useParams().color)
    const [ talla, setTalla ] = useState(null)
    const [ error, setError ] = useState('')

    const producto = useLoaderData()

    const { setPanelAbierto } = useOutletContext()

    const calcularPrecio = (centimos) => {
        let euros =  centimos / 100
        if (producto.descuento > 0) euros = Number((euros * ((100 - producto.descuento) / 100)).toFixed(2))
        return euros
    }

    const incluirProductoEnCarrito = () => {
        const objProducto =  {
            id_producto: producto._id,
            precio: producto.precio * ((100 - producto.descuento) / 100),
            color: color,
            talla: talla,
            cantidad: 1
        }

        if (!(producto.categoria === "anillo" && !talla)) {
            const producto_ya_incluido = carritoContext[0].findIndex(p => (p.id_producto === producto._id && p.color === color))
            if (producto_ya_incluido != -1) {
                if (producto.categoria === "anillo") {
                    const posicion_producto_incluido_con_talla = carritoContext[0].findIndex(p => (p.id_producto === producto._id && p.color === color && p.talla === talla))
                    if (posicion_producto_incluido_con_talla != -1) {
                        if (carritoContext[0][posicion_producto_incluido_con_talla].cantidad >= producto.stock) {
                            mensajeContext[1](`No quedan más existencias de ${producto.titulo}`)
                            return
                        } else {
                            carritoContext[0][posicion_producto_incluido_con_talla].cantidad++
                            carritoContext[1](carritoContext[0])
                        }
                    } else {
                        const arrayProductosCarrito = carritoContext[0]
                        arrayProductosCarrito.push(objProducto)
                        carritoContext[1](arrayProductosCarrito)
                    }
                    setError('')
                } else {
                    if (carritoContext[0][producto_ya_incluido].cantidad >= producto.stock) {
                        mensajeContext[1](`No quedan más existencias de ${producto.titulo}`)
                        return
                    } else {
                        carritoContext[0][producto_ya_incluido].cantidad++
                        carritoContext[1](carritoContext[0])
                    }
                }
            } else {
                const arrayProductosCarrito = carritoContext[0]
                arrayProductosCarrito.push(objProducto)
                carritoContext[1](arrayProductosCarrito)
            }

            setPanelAbierto("carrito")
            localStorage.setItem("productos_carrito", JSON.stringify(carritoContext[0]))
            mensajeContext[1](`${producto.titulo} añadido correctamente al carrito`)
        } else {
            setError("¡Selecciona una talla!")
        }
    }
    
    const [ dataStock ] = useFetch(`/stockAnillos/${producto._id}`)

    return (
        <section className="producto_individual">
            <section className="producto_individual__izquierda">
                <img className={color === 'plata' && "producto_plata"} src={`${VITE_API_HOST}/public/${producto?.imagen}`} alt="foto no disponible" />
                {
                    producto.stock < 1 && (
                        <div className="mensaje_agotado">AGOTADO</div>
                    )
                }
            </section>
            <section className="producto_individual__derecha">
                <div className="derecha__informacion">
                    <div className="derecha__informacion__titulo"><h2>{producto.titulo}</h2></div>
                    <div className="derecha__informacion__descripcion"><p>{producto.descripcion}</p></div>
                    <div className="derecha__informacion__precio"><h4>{calcularPrecio(producto.precio)}€</h4></div>
                </div>
                <div className="derecha__colores">
                    <Colores color={color} setColor={setColor} />
                </div>
                { producto.categoria === "anillo" && 
                    <div className="derecha__tallas">
                        <p>TALLAS</p>
                        <div className="derecha__tallas__tallas">
                            <button value="10" className={`boton boton_talla ${dataStock?.results.talla10 < 1 && 'talla__agotada'} ${talla === "10" && "talla_seleccionada"}`} onClick={(e) => { dataStock?.results.talla10 > 1 && setTalla(e.target.value) }} >10</button>
                            <button value="12" className={`boton boton_talla ${dataStock?.results.talla12 < 1 && 'talla__agotada'} ${talla === "12" && "talla_seleccionada"}`} onClick={(e) => { dataStock?.results.talla12 > 1 && setTalla(e.target.value) }} >12</button>
                            <button value="14" className={`boton boton_talla ${dataStock?.results.talla14 < 1 && 'talla__agotada'} ${talla === "14" && "talla_seleccionada"}`} onClick={(e) => { dataStock?.results.talla14 > 1 && setTalla(e.target.value) }} >14</button>
                            <button value="16" className={`boton boton_talla ${dataStock?.results.talla16 < 1 && 'talla__agotada'} ${talla === "16" && "talla_seleccionada"}`} onClick={(e) => { dataStock?.results.talla16 > 1 && setTalla(e.target.value) }} >16</button>
                            <button value="18" className={`boton boton_talla ${dataStock?.results.talla18 < 1 && 'talla__agotada'} ${talla === "18" && "talla_seleccionada"}`} onClick={(e) => { dataStock?.results.talla18 > 1 && setTalla(e.target.value) }} >18</button>
                            <button value="20" className={`boton boton_talla ${dataStock?.results.talla20 < 1 && 'talla__agotada'} ${talla === "20" && "talla_seleccionada"}`} onClick={(e) => { dataStock?.results.talla20 > 1 && setTalla(e.target.value) }} >20</button>
                            <button value="22" className={`boton boton_talla ${dataStock?.results.talla22 < 1 && 'talla__agotada'} ${talla === "22" && "talla_seleccionada"}`} onClick={(e) => { dataStock?.results.talla22 > 1 && setTalla(e.target.value) }} >22</button>
                            <button value="24" className={`boton boton_talla ${dataStock?.results.talla24 < 1 && 'talla__agotada'} ${talla === "24" && "talla_seleccionada"}`} onClick={(e) => { dataStock?.results.talla24 > 1 && setTalla(e.target.value) }} >24</button>
                        </div>
                    </div> 
                }
                {
                    error && <p className="pago_error" style={{fontSize: "22px", margin: "0 0 .5rem"}}>{error}</p>
                }
                <button className={`boton ${ producto.stock === 0 ? 'boton_agotado' : 'derecha__boton' }`} onClick={ () => producto.stock > 0 && incluirProductoEnCarrito() } >AÑADIR</button>
            </section>
        </section>
    )
}