import { useContext,  useState } from "react"
import { UsuarioContext } from "../../contexts/UsuarioContext"
import { MensajeContext } from "../../contexts/MensajeContext"
import DatosTarjeta from "../Datos/DatosTarjeta"
import DatosPersonales from "../Datos/DatosPersonales"

export default function DatosUsuario ({ cerrarPanel }) {
    const { VITE_API_HOST } = import.meta.env

    // Datos de la tarjeta
    const [ numeroTarjeta, setNumeroTarjeta ] = useState('')
    const [ codigoSeguridad, setCodigoSeguridad ] = useState('')
    const [ fechaCaducidadMes, setFechaCaducidadMes ] = useState('')
    const [ fechaCaducidadAno, setFechaCaducidadAno ] = useState('')
    const [ datosPagoIniciales, setDatosPagoIniciales ] = useState(null)

    // Datos de Usuario
    const [ correo, setCorreo ] = useState('')
    const [ ciudad, setCiudad ] = useState('')
    const [ provincia, setProvincia] = useState('')
    const [ domicilio, setDomicilio ] = useState('')
    const [ datosPersonalesIniciales, setDatosPersonalesIniciales ] = useState(null)

    const [ error, setError ] = useState(null)

    const usuarioContext = useContext(UsuarioContext)
    const mensajeContext = useContext(MensajeContext)

    const cerrarSesion = () => {
        const cerrar_sesion = confirm("¿Seguro que quieres cerrar la sesión?")

        if (cerrar_sesion) {
            sessionStorage.removeItem("usuario")
            mensajeContext[1](`Hasta pronto ${usuarioContext[0].nombre}`)
            usuarioContext[1](null)
            cerrarPanel()
        }
    }

    const restablecerDatosPago = (e) => {
        e.preventDefault()

        setNumeroTarjeta(datosPagoIniciales[0])
        setFechaCaducidadMes(datosPagoIniciales[1])
        setFechaCaducidadAno(datosPagoIniciales[2])
        setCodigoSeguridad(datosPagoIniciales[3])
    }

    const restablecerDatosPersonales = (e) => {
        e.preventDefault()

        setCorreo(datosPersonalesIniciales[0])
        setCiudad(datosPersonalesIniciales[1])
        setProvincia(datosPersonalesIniciales[2])
        setDomicilio(datosPersonalesIniciales[3])
    }

    const guardarDatosPersonales = async(e) => {
        e.preventDefault(e)

        if (correo === datosPersonalesIniciales[0] && ciudad === datosPersonalesIniciales[1] && provincia === datosPersonalesIniciales[2] && domicilio === datosPersonalesIniciales[3]) {
            setError("No has modificado ningún dato de tus datos personales")
        } else {
            error && setError(null)
            const response = await fetch(`${VITE_API_HOST}/usuarios/actualizar-usuario/${usuarioContext[0]._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ correo, ciudad, provincia, domicilio })
            })
            const data = await response.json()

            if (data?.status === 'ok') {
                mensajeContext[1](`Datos personales de ${usuarioContext[0].nombre} actualizados correctamente`)
            } else {
                mensajeContext[1](`No se han podido actualizar los datos personales de ${usuarioContext[0].nombre}`)
            }
        }
    }

    const guardarDatosPago = async (e) => {
        e.preventDefault()

        const objetoDatosPago = {
            id_usuario: usuarioContext[0]._id,
            n_tarjeta: numeroTarjeta,
            fecha_caducidad: `${fechaCaducidadMes}/${fechaCaducidadAno}`,
            codigo_seguridad: codigoSeguridad
        }

        if (datosPagoIniciales) {
            if (numeroTarjeta === datosPagoIniciales[0] && fechaCaducidadMes === datosPagoIniciales[1] && fechaCaducidadAno === datosPagoIniciales[2] && codigoSeguridad === datosPagoIniciales[3]) {
                setError("No has modificado ningún dato de tu tarjeta actual")
            } else {
                error && setError(null)
                const response = await fetch(`${VITE_API_HOST}/datosDePago/actualizar-datos/${usuarioContext[0]._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(objetoDatosPago)
                })
                const data = await response.json()
    
                if (data.status === 'ok') {
                    mensajeContext[1](`Datos de la tarjeta de ${usuarioContext[0].nombre} actualizados correctamente`)
                    asociarDatosDePago(data.results)
                }
            }
        } else {
            const response = await fetch(`${VITE_API_HOST}/datosDePago/crear-datos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(objetoDatosPago)
            })
            const data = await response.json()

            if (data.status === 'ok') {
                mensajeContext[1](`Tarjeta asociada a ${usuarioContext[0].nombre} correctamente`)
                asociarDatosDePago(data.results)
            }
        }
    }

    return (
        <div className="datos_usuario">
            <img className="datos_usuario__logo" src="../../sella_logo.png" />
            <h2>¡Hola {usuarioContext[0].nombre}!</h2>
            <div className="datos_usuario__tarjeta">
                <div className="boton datos_usuario__boton_datos_pago" onClick={() => { document.querySelector('.datos_usuario__tarjeta__form').classList.toggle('datos_pago_desplegados'); document.querySelector('.datos_usuario__personales__form').classList.remove('datos_pago_desplegados'); document.querySelector('.datos_usuario__boton_datos_pago i').classList.toggle('girar_flecha'); document.querySelector('.datos_usuario__boton_datos_personales i').classList.remove('girar_flecha'); setError('') }} ><i className="fa-solid fa-caret-right"></i> Datos de pago</div>
                <form className="datos_usuario__tarjeta__form">
                    <DatosTarjeta numeroTarjeta={numeroTarjeta} setNumeroTarjeta={setNumeroTarjeta} fechaCaducidadMes={fechaCaducidadMes} setFechaCaducidadMes={setFechaCaducidadMes} fechaCaducidadAno={fechaCaducidadAno} setFechaCaducidadAno={setFechaCaducidadAno} codigoSeguridad={codigoSeguridad} setCodigoSeguridad={setCodigoSeguridad} setDatosPagoIniciales={setDatosPagoIniciales} />
                    { error && <p className="pago_error">{error}</p> }
                    <div className="form_pago__botones">
                        <button className="boton" onClick={(e) => restablecerDatosPago(e)}>RESTABLECER</button>
                        <button className="boton" onClick={(e) => guardarDatosPago(e)}>GUARDAR</button>
                    </div>
                </form>
                <div className="boton datos_usuario__boton_datos_personales" onClick={() => { document.querySelector('.datos_usuario__personales__form').classList.toggle('datos_pago_desplegados'); document.querySelector('.datos_usuario__tarjeta__form').classList.remove('datos_pago_desplegados'); document.querySelector('.datos_usuario__boton_datos_personales i').classList.toggle('girar_flecha'); document.querySelector('.datos_usuario__boton_datos_pago i').classList.remove('girar_flecha'); setError('') }} ><i className="fa-solid fa-caret-right"></i> Datos personales</div>
                <form className="datos_usuario__personales__form">
                    <DatosPersonales correo={correo} setCorreo={setCorreo} ciudad={ciudad} setCiudad={setCiudad} provincia={provincia} setProvincia={setProvincia} domicilio={domicilio} setDomicilio={setDomicilio} setDatosPersonalesIniciales={setDatosPersonalesIniciales} datosPersonales={true} />
                    { error && <p className="pago_error">{error}</p> }
                    <div className="form_datos_personales__botones">
                        <button className="boton" onClick={(e) => restablecerDatosPersonales(e)} >RESTABLECER</button>
                        <button className="boton" onClick={(e) => guardarDatosPersonales(e)} >GUARDAR</button>
                    </div>
                </form>
            </div>
            <button className="boton datos_usuario__boton_cerrar_sesion" onClick={cerrarSesion} >CERRAR SESIÓN</button>
        </div>
    )
}