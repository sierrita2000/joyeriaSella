import { useContext, useState } from "react"
import { CarritoContext } from "../../contexts/CarritoContext"
import ProductoCarrito from "./ProductoCarrito"
import ModalCompra from "./ModalCompra"

export default function Carrito ({ cerrarPanel }) {

    const carritoContext = useContext(CarritoContext)

    const [ modalCompraAbierto, setModalCompraAbierto ] = useState(false)

    const calcularTotal = () => {
        let total = 0

        carritoContext[0].forEach(producto => {
            total += producto.precio * producto.cantidad
        })

        return total / 100
    }

    return (
        <div className="carrito">
            <img className="carrito__logo" src="../../sella_logo.png" />
            {
                carritoContext[0].length != 0 ? (
                    <>
                        <div className="carrito__carrito">
                            {
                                carritoContext[0].map(producto => {
                                    return <ProductoCarrito key={Math.random()} { ...producto } />
                                })
                            }
                        </div>
                        <div className="carrito__final_compra">
                            <p>TOTAL:  {calcularTotal()}€</p>
                            <button className="boton boton_carrito__compra" onClick={() => setModalCompraAbierto(true)} >COMPRAR</button>
                        </div>
                    </>
                ) : (
                    <div className="carrito__vacio">
                        <img src="../../bolsa_sella.png" />
                        <h4>No hay productos aún en tu carro</h4>
                    </div>
                )
            }
            {
                modalCompraAbierto && <ModalCompra setModalCompraAbierto={setModalCompraAbierto} total={calcularTotal()} cerrarPanel={cerrarPanel} />
            }
        </div>
    )
} 