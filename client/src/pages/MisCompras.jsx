import { useLoaderData } from 'react-router-dom'
import Compra from '../components/Compras/Compra'

export const loader = async ({ params }) => {
    const { VITE_API_HOST } = import.meta.env
    const { id_usuario } = params

    const response = await fetch(`${VITE_API_HOST}/compras/usuario/${id_usuario}`)
    const data = await response.json()

    if (data.status === 'ok') {
        return data.results
    } else {
        return []
    }
}

export default function MisCompras () {

    const compras = useLoaderData()

    return (
        <div className="mis_compras">
            {
                compras ? (
                    <div className="mis_compras__compras">
                        {
                            compras.map(compra => {
                                return <Compra key={compra._id} { ...compra } />
                            })
                        }
                    </div>
                ) : (
                    <div className="mis_compras__vacio">
                        <img src="../../bolsa_sella.png" />
                        <h1>No hay registrada ninguna compra aún</h1>
                    </div>
                )
            }
        </div>
    )
}