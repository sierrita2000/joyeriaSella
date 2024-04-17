import { useState, useContext } from "react"
import { UsuarioContext } from "../../contexts/UsuarioContext"
import { MensajeContext } from "../../contexts/MensajeContext"

export default function LoginSignup () {

    const { VITE_API_HOST } = import.meta.env
    const [ formRegistro, setFormRegistro ] = useState(false)
    const [ error, setError ] = useState("")
    
    const usuarioContext = useContext(UsuarioContext)
    const mensajeContext = useContext(MensajeContext)

    // Animación cuando aparece el mensaje de error.
    const animacion =   [
                            {transform: "translateX(-4px)", offset: 0.2},
                            {transform: "translateX(4px)", offset: 0.4},
                            {transform: "translateX(-4px)", offset: 0.6},
                            {transform: "translateX(4px)", offset: 0.7}
                        ]
    const options =      { duration: 500 }

    /**
     * Gestiona el inicio de sesión
     * @param {Event} e 
     */
    const iniciarSesion = async (e) => {
        e.preventDefault()
        const nombre = document.getElementById('login_signup_usuario')
        const password = document.getElementById('login_signup_password')

        if (!nombre.value || !password.value) {
            setError("Rellena todos los campos")
            document.querySelector('.login_signup__error').animate(animacion, options)
        } else {
            const response = await fetch(`${VITE_API_HOST}/usuarios/nombre/${nombre.value}/password/${password.value}`)
            const data = await response.json()

            if (data.status === 'ok') {
                usuarioContext[1](data.results)
                sessionStorage.setItem("usuario", data.results._id)
                mensajeContext[1](`Bienvenido ${data.results.nombre}`)
            } else {
                setError(data.message)
                document.querySelector('.login_signup__error').animate(animacion, options)
            }
        }
    }

    /**
     * Gestiona el registro de un usuario.
     * @param {Event} e 
     */
    const registrarUsuario = async (e) => {
        e.preventDefault()

        const nombre = document.getElementById('login_signup_usuario')
        const password = document.getElementById('login_signup_password')
        const password_repeat = document.getElementById('login_signup_password_repeat')

        if (!nombre.value || !password.value || !password_repeat.value) {
            setError("Rellena todos los campos")
            document.querySelector('.login_signup__error').animate(animacion, options)
        } else if (password.value != password_repeat.value) {
            setError("Las contraseñas no coinciden")
            document.querySelector('.login_signup__error').animate(animacion, options)
        } else {
            const response = await fetch(`${VITE_API_HOST}/usuarios/crear-usuario`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "nombre": nombre.value, "password": password.value })
            })
            const data = await response.json()

            if (data.status === 'ok') {
                usuarioContext[1](data.results)
                sessionStorage.setItem("usuario", data.results._id)
                mensajeContext[1](`Bienvenido ${data.results.nombre}`)
            } else {
                setError("No se ha podido crear el usuario")
                document.querySelector('.login_signup__error').animate(animacion, options)
            }
        }
    }

    const limpiarFormulario = () => {
        const nombre = document.getElementById('login_signup_usuario')
        const password = document.getElementById('login_signup_password')
        const password_repeat = document.getElementById('login_signup_password_repeat')

        nombre.value = ""
        password.value = ""
        if (password_repeat) password_repeat.value = ""

        setError('')

        setFormRegistro(!formRegistro)
    }

    return (
            <div className="login_signup">
                <img src="../../sella_logo.png" />
                <form className="login_signup__form">
                    <label htmlFor="login_signup_usuario">usuario:</label>
                    <input type="text" name="login_signup_usuario" id="login_signup_usuario" />
                    <label htmlFor="login_signup_password">contraseña:</label>
                    <input type="password" name="login_signup_password" id="login_signup_password" />
                    {
                        formRegistro && (
                            <>
                                <label htmlFor="login_signup_password_repeat">repite la contraseña:</label>
                                <input type="password" name="login_signup_password_repeat" id="login_signup_password_repeat" />
                            </>
                        )
                    }
                    <button className="boton" type="submit" onClick={(e) => { formRegistro ? registrarUsuario(e) : iniciarSesion(e) }} >{formRegistro ? "REGISTRATE" : "INICIAR"}</button>
                    {error && <p className="login_signup__error">¡{error}!</p>}
                </form>
                <p>{ formRegistro ? "¿Ya tienes cuenta?" : "¿Aún no tienes cuenta?" }</p>
                <p>{ formRegistro ? "logueate" : "regístrate" } <button className="boton boton_registro" onClick={limpiarFormulario} >AQUÍ</button></p>
            </div>
    )
}