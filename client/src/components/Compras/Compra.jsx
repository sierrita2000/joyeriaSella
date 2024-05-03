import ProductoCarrito from "../Carrito/ProductoCarrito"

export default function Compra ({ correo, ciudad, provincia, domicilio, productos, n_tarjeta, total }) {

    /**
     * Cambia el formato del número de tarjeta sustituyendo los 3 primeros conjuntos de números por X para ocultarlos.
     * @returns {String}
     */
    const formatoTarjetaOculta = () => {
        let nueva_tarjeta = "xxxx xxxx xxxx "
        
        return nueva_tarjeta.concat(n_tarjeta.slice(-4))
    }

    return (
        <div className="mis_compras__compra">
            <div className="mis_compras__compra__productos">
                {
                    productos.map(producto => {
                        return <div style={{margin: "0 0 2rem"}}><ProductoCarrito key={Math.random()} { ...producto } resumen={true} /></div>
                    })
                }
            </div>
            <div className="mis_compras__compra__informacion">
                <div className="compra__informacion__tarjeta">
                    <i className="fa-solid fa-credit-card"></i>
                    <p>{formatoTarjetaOculta()}</p>
                </div>
                <div className="compra__informacion__datos_usuario">
                    <div className="datos_usuario__correo">
                        <p>correo: </p>
                        <h4>{correo}</h4>
                    </div>
                    <div className="datos_usuario__correo">
                        <p>ciudad: </p>
                        <h4>{ciudad}</h4>
                    </div>
                    <div className="datos_usuario__correo">
                        <p>provincia: </p>
                        <h4>{provincia}</h4>
                    </div>
                    <div className="datos_usuario__correo">
                        <p>domicilio: </p>
                        <h4>{domicilio}</h4>
                    </div>
                </div>
            </div>
            <div className="mis_compras__compra__total">
                <p>{total / 100}€</p>
            </div>
        </div>
    )
}