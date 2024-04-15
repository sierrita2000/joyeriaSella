import { useContext, useEffect } from "react"
import { UsuarioContext } from "../../contexts/UsuarioContext"

export default function DatosPersonales ({ correo, setCorreo, ciudad, setCiudad, provincia, setProvincia, domicilio, setDomicilio, setDatosPersonalesIniciales, datosPersonales }) {

    const { VITE_API_HOST } = import.meta.env

    const usuarioContext = useContext(UsuarioContext)

    const asociarDatosPersonales = (data) => {
        setCorreo(data.correo)
        setCiudad(data.ciudad)
        setProvincia(data.provincia)
        setDomicilio(data.domicilio)
        setDatosPersonalesIniciales([data.correo, data.ciudad, data.provincia, data.domicilio])
    }

    useEffect(() => {
        if(usuarioContext[0]) {
            fetch(`${VITE_API_HOST}/usuarios/${usuarioContext[0]._id}`)
                .then(response => response.json())
                .then(data => {
                    if (data?.status === 'ok') {
                        asociarDatosPersonales(data?.results)
                    }
                })
        }
    }, [])

    return (
        <section className="datos_personales__form_usuario">
            <div className="form_usuario__correo">
                <label htmlFor="usuario_correo">Correo:</label>
                <input type="text" name="usuario_correo" id="usuario_correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>
            <div className="form_usuario__localizacion" style={datosPersonales && {flexDirection: "column"}}>
                <div style={datosPersonales && {width: "100%"}}>
                    <label htmlFor="usuario_ciudad">Ciudad:</label>
                    <input type="text" name="usuario_ciudad" id="usuario_ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                </div>
                <div style={datosPersonales && {width: "100%"}}>
                    <label htmlFor="usuario_provincia">Provincia:</label>
                    <input type="text" name="usuario_provincia" id="usuario_provincia" value={provincia} onChange={(e) => setProvincia(e.target.value)} />
                </div>
            </div>
            <div className="form_usuario__domicilio">
                <label htmlFor="usuario_domicilio">Domicilio:</label>
                <input type="text" name="usuario_domicilio" id="usuario_domicilio" value={domicilio} onChange={(e) => setDomicilio(e.target.value)} />
            </div>
        </section>
    )
}