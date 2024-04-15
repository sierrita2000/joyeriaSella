import { Router } from "express"
import { iniciar_conexion } from "../connection/connection.js"
import { actualizarDatosDeUsuario, crearUsuario, devolverUsuarioPorId, eliminarUsuario, validarUsuario } from "../controllers/usuarios.controller.js"
import { devolverDatosDePago, crearDatosDePago, datosDePagoDeUsuario, actualizarDatosDePago } from "../controllers/datosPago.controller.js"
import { actulizarProducto, cargarAnillosIniciales, cargarProductosIniciales, crearProducto, devolverAnilloRandom, devolverProducto, devolverTodosLosProductos, eliminarProducto } from "../controllers/productos.controller.js"
import { devolverCompra, devolverComprasDeUsuario, /*, completarCompra, eliminarCompra, incluirNuevoProductoEnCompra, retirarProductoDeCompra*/ 
realizarCompra} from "../controllers/compra.controller.js"
import { devolverStockDeAnillo } from "../controllers/stockAnillos.controller.js"

export const router = Router()

iniciar_conexion()

/**
 * Respuesta que envía nuestra API al cliente
 */
export class ResponseAPI {
    constructor(status, message, results) {
        this.status = status,
        this.message = message,
        this.results = results
    }

    /**
     * Devuelve un objeto de respuesta
     * @returns Object
     */
    obj() {
        return {
            status: this.status,
            message: this.message,
            results: this.results
        }
    }
}

/**
 * RUTAS DE USUARIOS
 */

router.get("/usuarios/nombre/:nombre/password/:password", validarUsuario)
router.get("/usuarios/:_id", devolverUsuarioPorId)

router.post("/usuarios/crear-usuario", crearUsuario)

router.put("/usuarios/actualizar-usuario/:_id",actualizarDatosDeUsuario)

router.delete("/usuarios/eliminar/:_id", eliminarUsuario)

/**
 * RUTAS DE DATOS DE PAGO
 */

router.get("/datosDePago/id/:_id", devolverDatosDePago)
router.get("/datosdePago/usuario/:id_usuario", datosDePagoDeUsuario)

router.post("/datosDePago/crear-datos", crearDatosDePago)

router.put("/datosDePago/actualizar-datos/:id_usuario", actualizarDatosDePago)

/**
 * RUTAS DE PRODUCTOS
 */

router.get("/productos/id/:_id", devolverProducto)
router.post("/productos/todos/limit/:limit", devolverTodosLosProductos)
router.get("/productos/anillo-random", devolverAnilloRandom) 

router.post("/productos/crear-producto", crearProducto)
router.post("/productos/carga-inicial", cargarProductosIniciales)
router.post("/productos/carga-anillos", cargarAnillosIniciales)

router.put("/productos/actualizar/:_id", actulizarProducto)

router.delete("/productos/eliminar/:_id", eliminarProducto)

/**
 * RUTAS DE COMPRAS
 */

router.get("/compra/id/:_id", devolverCompra)
router.get("/compras/usuario/:id_usuario", devolverComprasDeUsuario)

router.post("/compras/realizar-compra", realizarCompra)

/*router.put("/compra/id/:_id/incluir-producto", incluirNuevoProductoEnCompra)
router.put("/compra/id/:_id/retirar-producto", retirarProductoDeCompra)
router.put("/compra/id/:_id/realizar-compra", completarCompra)

router.delete("/compra/eliminar/:_id", eliminarCompra)*/

/**
 * RUTAS DE STOCK
 */

router.get("/stockAnillos/:id_producto", devolverStockDeAnillo)