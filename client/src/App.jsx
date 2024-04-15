import './App.css'
import './css/App-medias.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Inicio from './pages/Inicio'
import MenuCabecera from './components/menu_cabecera/MenuCabecera'
import Productos, { loaderAnillos, loaderCollares, loaderPulseras } from './pages/Productos'
import ProductoIndividual, { loader as loaderProductoIndividual } from './pages/ProductoIndividual'
import { useEffect, useState } from 'react'
import { UsuarioContext } from './contexts/UsuarioContext'
import MisCompras, { loader as loaderMisCompras } from './pages/MisCompras'

const router = createBrowserRouter ([
  {
    path: "/",
    element: <MenuCabecera />,
    children: [
      {
        index: true,
        element: <Inicio />
      },
      {
        path:"/collares",
        element: <Productos />,
        loader: loaderCollares
      },
      {
        path:"/collares/oro",
        element: <Productos material="oro" />,
        loader: loaderCollares
      },
      {
        path:"/collares/plata",
        element: <Productos material="plata" />,
        loader: loaderCollares
      },
      {
        path:"/pulseras",
        element: <Productos />,
        loader: loaderPulseras
      },
      {
        path:"/pulseras/oro",
        element: <Productos material="oro" />,
        loader: loaderPulseras
      },
      {
        path:"/pulseras/plata",
        element: <Productos material="plata" />,
        loader: loaderPulseras
      },
      {
        path:"/anillos",
        element: <Productos />,
        loader: loaderAnillos
      },
      {
        path:"/anillos/oro",
        element: <Productos material="oro" />,
        loader: loaderAnillos
      },
      {
        path:"/anillos/plata",
        element: <Productos material="plata" />,
        loader: loaderAnillos
      },
      {
        path: "/producto/:id/:color",
        element: <ProductoIndividual />,
        loader: loaderProductoIndividual
      },
      {
        path: "/compras/:id_usuario",
        element: <MisCompras />,
        loader: loaderMisCompras
      }
    ]
  }
])

function App() {
  const [ usuario, setUsuario ] = useState(null)
  const { VITE_API_HOST } = import.meta.env

  useEffect(() => {
    const usuario_id = sessionStorage.getItem("usuario")

    if (usuario_id) {
      fetch(`${VITE_API_HOST}/usuarios/${usuario_id}`)
        .then(response => response.json())
          .then(data => {
            if (data.status === 'ok') setUsuario(data.results)
          })
    }
  }, [])

  return (
    <UsuarioContext.Provider value={[ usuario, setUsuario ]} >
      <RouterProvider router={router} />
    </UsuarioContext.Provider >
  )
}

export default App
