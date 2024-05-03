import { useContext, useState } from "react"
import PasoPago from "./CarritoModal/PasoPago"
import DatosPersonales from "../Datos/DatosPersonales"
import { UsuarioContext } from "../../contexts/UsuarioContext"
import { CarritoContext } from "../../contexts/CarritoContext"
import { MensajeContext } from "../../contexts/MensajeContext"
import { useNavigate } from 'react-router-dom'

export default function ModalCompra ({ setModalCompraAbierto, total, cerrarPanel }) {

    const { VITE_API_HOST } = import.meta.env

    const navigate = useNavigate()

    const usuarioContext = useContext(UsuarioContext)
    const carritoContext = useContext(CarritoContext)
    const mensajeContext = useContext(MensajeContext)

    const [ siguiente, setSiguiente ] = useState(true)
    const [ error, setError ] = useState('')

    // Datos de Usuario
    const [ correo, setCorreo ] = useState('')
    const [ ciudad, setCiudad ] = useState('')
    const [ provincia, setProvincia] = useState('')
    const [ domicilio, setDomicilio ] = useState('')

    //Datos de Pago
    const [ nTarjeta, setNTarjeta ] = useState('')
    const [ mes, setMes ] = useState('')
    const [ ano, setAno ] = useState('')
    const [ codSeguridad, setCodSeguridad ] = useState('') 

    /**
     * Comprueba si el usuario ha rellenado todos los campos del formulario.
     * @param {Array} campos 
     * @returns {boolean}
     */
    const camposRellenos = (campos) => {
        let todos_campos_rellenos = true
        campos.forEach(c => { if(!c) todos_campos_rellenos = false })
        return todos_campos_rellenos
    }

    /**
     * Ejecuta la compra haciendo una llamada a la API.
     */
    const realizarCompra = async() => {
        if(confirm("¿Seguro que deseas realizar la compra?")) {
            //Identifica si la compra la ha realizado un usuario registrado o no.
            const id_usuario = usuarioContext[0]?._id || null
            const response = await fetch(`${VITE_API_HOST}/compras/realizar-compra`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({              //Objecto de compra.
                    id_usuario: id_usuario,
                    correo: correo,
                    ciudad: ciudad,
                    provincia: provincia,
                    domicilio: domicilio,
                    productos: carritoContext[0],
                    n_tarjeta: nTarjeta,
                    total: total*100
                })
            })
            const data = await response.json()

            /**
             * Si la respuesta es buena:
             *  - Limpiamos el localStorage.
             *  - Vaciamos el estado del carrito.
             *  - Mostramos un mensaje de "compra realizada con éxito".
             *  - Cerramos el modal de compra y el panel de la derecha.
             *  - Nos redirige al panel de compra si somos un usuario logueado.
             */
            if (data.status === 'ok') {
                localStorage.clear()
                carritoContext[1]([])
                mensajeContext[1](data.message)
                setModalCompraAbierto(false)
                cerrarPanel()
                if(usuarioContext[0]) navigate(`/compras/${usuarioContext[0]._id}`)
            } else {
                console.error(data)
            }
        }
    }

    return (
        <div className="modal_compra">
            <div className="modal_compra__modal">
                <button className="boton boton_modal_cerrar" onClick={() => setModalCompraAbierto(false)} ><i className="fa-solid fa-xmark"></i></button>
                <div className="modal__pasos">
                    <div className={`modal__pasos__paso paso_usuario ${siguiente ? 'paso_seleccionado': 'paso_no_seleccionado'}`}>DATOS DE USUARIO</div>
                    <div className={`modal__pasos__paso paso_pago ${!siguiente ? 'paso_seleccionado': 'paso_no_seleccionado'}`}>DATOS DE PAGO</div>
                </div>
                <div className="modal_compra__contenido">
                    {
                        siguiente 
                            ? 
                                <DatosPersonales correo={correo} setCorreo={setCorreo} ciudad={ciudad} setCiudad={setCiudad} provincia={provincia} setProvincia={setProvincia} domicilio={domicilio} setDomicilio={setDomicilio} /> 
                            : 
                                <PasoPago nTarjeta={nTarjeta} setNTarjeta={setNTarjeta} mes={mes} setMes={setMes} ano={ano} setAno={setAno} codSeguridad={codSeguridad} setCodSeguridad={setCodSeguridad} total={total} /> 
                    }
                </div>
                { error && <p className="modal_compra__error">{error}</p> }
                <div className="modal_compra__botones">
                    <button className="boton boton_modal_pasar_pagina" onClick={() => 
                        { 
                            if (camposRellenos([correo, ciudad, provincia, domicilio])) { 
                                setSiguiente(!siguiente) 
                                setError('') 
                            } else { 
                                setError("Debes rellenar todos los campos") 
                            } 
                        }} >{ siguiente ? 'SIGUIENTE' : 'ANTERIOR' }</button>
                    { !siguiente && <button className="boton boton_modal__comprar" onClick={() => {
                        if (camposRellenos([nTarjeta, mes, ano, codSeguridad])) {
                            realizarCompra()
                        } else {
                            setError("Debes rellenar todos los datos de tu tarjeta")
                        }
                    }} >COMPRAR</button> }
                </div>
            </div>
        </div>
    )
}