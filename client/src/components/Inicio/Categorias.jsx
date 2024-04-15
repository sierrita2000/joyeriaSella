import { useFetch } from "../../hooks/useFetch";
import Categoria from './Categoria'

export default function Categorias () {

    const [ dataCollar, loadingCollar, errorCollar ] = useFetch("/productos/todos/limit/1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            categoria: "collar"
        })
    })

    const [ dataPulsera, loadingPulsera, errorPulsera ] = useFetch("/productos/todos/limit/1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            categoria: "pulsera"
        })
    })

    const [ dataAnillo, loadingAnillo, errorAnillo ] = useFetch("/productos/todos/limit/1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            categoria: "anillo"
        })
    })

    return (
        <div className="inicio__categorias">
            <Categoria titulo="COLLARES" imagen={dataCollar?.results[0].imagen} loading={loadingCollar} />
            <Categoria titulo="PULSERAS" imagen={dataPulsera?.results[0].imagen} loading={loadingPulsera} /> 
            <Categoria titulo="ANILLOS" imagen={dataAnillo?.results[0].imagen} loading={loadingAnillo} />
        </div>
    )
}