import { useContext } from "react"
import { CarritoContext } from "../../../contexts/CarritoContext"
import ProductoCarrito from "../ProductoCarrito"
import DatosTarjeta from "../../Datos/DatosTarjeta"

export default function PasoPago ({ nTarjeta, setNTarjeta, mes, setMes, ano, setAno, codSeguridad, setCodSeguridad, total }) {

    const carritoContext = useContext(CarritoContext)

    return (
        <div className="modal_compra__paso_pago">
            <section className="paso_pago__resumen">
                <section className="paso_pago__resumen__productos">
                    {
                        carritoContext[0].map(producto => {
                            return (
                                <div style={{margin: "0 0 2rem"}}>
                                    <ProductoCarrito key={Math.random()} { ...producto } resumen={true} />
                                </div>
                            )
                        })
                    }
                </section>
                <p className="paso_pago__resumen__total">TOTAL:<p>{total}€</p></p>
            </section>
            <section className="paso_pago__datos_pago">
                <DatosTarjeta numeroTarjeta={nTarjeta} setNumeroTarjeta={setNTarjeta} fechaCaducidadMes={mes} setFechaCaducidadMes={setMes} fechaCaducidadAno={ano} setFechaCaducidadAno={setAno} codigoSeguridad={codSeguridad} setCodigoSeguridad={setCodSeguridad} modal_compra={true} />
            </section>
        </div>
    )
}