import { useLoaderData } from "react-router-dom"
import Producto from "../components/productos/Producto"

const { VITE_API_HOST } = import.meta.env

const cargaProductos = async (categoria) => {
    const response = await fetch(`${VITE_API_HOST}/productos/todos/limit/0`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            categoria
        })
    })
    const data = await response.json()

    if (data.status === 'ok') return data.results
    else return data.status
}

export const loaderCollares = () => cargaProductos("collar")
export const loaderPulseras = () => cargaProductos("pulsera")
export const loaderAnillos = () => cargaProductos("anillo")

export default function Productos ({ material }) {

    const productos = useLoaderData()

    return (
        <section className="productos">
            <section className="productos__productos">
                {
                    productos?.map(producto => {
                        return <Producto key={ producto._id } { ...producto } material={ material } />
                    })
                }
            </section>
            <section className="productos_botones">

            </section>
        </section>
    )
}