import { useContext, useEffect } from "react"
import { UsuarioContext } from "../../contexts/UsuarioContext"

export default function DatosTarjeta ({ numeroTarjeta, setNumeroTarjeta, fechaCaducidadMes, setFechaCaducidadMes, fechaCaducidadAno, setFechaCaducidadAno, codigoSeguridad, setCodigoSeguridad, setDatosPagoIniciales, modal_compra }) {

    const { VITE_API_HOST } = import.meta.env

    const usuarioContext = useContext(UsuarioContext)

    /**
     * Si es un valor de tipo Number devuelve true, si no false.
     * @param {value} e 
     * @returns {boolean}
     */
    const escribirNumeros = (e) => {
        if (!isNaN(e)) {
            return true
        } else {
            return false
        }
    }

    /**
     * Cambia el estado de los datos de la tarjeta.
     * @param {Object} data 
     */
    const asociarDatosDePago = (data) => {
        setNumeroTarjeta(data.n_tarjeta)
        setCodigoSeguridad(data.codigo_seguridad)
        const fecha = data.fecha_caducidad.split('/')
        setFechaCaducidadMes(fecha[0])
        setFechaCaducidadAno(fecha[1])
        setDatosPagoIniciales([data.n_tarjeta, fecha[0], fecha[1], data.codigo_seguridad])
    }

    /**
     * En la primera carga del componenete devuelve los datos de la tarjeta del usuario si existen.
     */
    useEffect(() => {
        if(usuarioContext[0]) {
            fetch(`${VITE_API_HOST}/datosdePago/usuario/${usuarioContext[0]._id}`)
                .then(response => response.json())
                .then(data => {
                    if (data?.status === 'ok') {
                        asociarDatosDePago(data.results)
                    }
                })
        }
    }, [])

    return (
        <div className='estilos_datos_tarjeta'>
            <label htmlFor="n_tarjeta">Nº tarjeta:</label>
            <div className="form__n_tarjeta">
                <i className="fa-solid fa-credit-card"></i>
                <input type="text" name="n_tarjeta" id="n_tarjeta" placeholder="xxxx xxxx xxxx xxxx" maxLength={16} value={numeroTarjeta} onChange={(e) => escribirNumeros(e.target.value) && setNumeroTarjeta(e.target.value)} />
            </div>
            <label htmlFor="fecha_caducidad">Caducidad:</label>
            <div className="form__fecha_caducidad">
                <i className="fa-solid fa-calendar-days"></i>
                <input type="number" name="fecha_caducidad" id="fecha_caducidad_mes" minLength={2} min={1} max={12} value={fechaCaducidadMes} onChange={(e) => escribirNumeros(e.target.value) && setFechaCaducidadMes(e.target.value) } />
                <p>/</p>
                <input type="number" name="fecha_caducidad" id="fecha_caducidad_ano" min={new Date().getFullYear()} value={fechaCaducidadAno} onChange={(e) => escribirNumeros(e.target.value) && setFechaCaducidadAno(e.target.value) } />
            </div>
            <label htmlFor="cod_seguridad">Código de Seguridad:</label>
            <div className="form__cod_seguridad">
                <i className="fa-solid fa-lock"></i>
                <input type="text" inputMode="numeric" name="cod_seguridad" id="cod_seguridad" placeholder="xxx" maxLength={3} value={codigoSeguridad} onChange={(e) => escribirNumeros(e.target.value) && setCodigoSeguridad(e.target.value)} />
            </div>
        </div>
    )
}