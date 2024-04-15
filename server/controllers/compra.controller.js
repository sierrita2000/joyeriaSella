import { Compra } from "../models/compra.js"
import { Producto } from "../models/productos.js"
import { StockAnillos } from "../models/stockAnillos.js"
import { ResponseAPI } from "../routes/index.routes.js"

/**
 * Devuelve una estancia de compra
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const devolverCompra = async (req, res, next) => {
    try {
        const { _id } = req.params

        await Compra.findById(_id).exec()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok', `Compra encontrada`, results))
            })
            .catch(error => {
                throw new Error(error)
            })
    } catch(error) {
        next(error)
    }
}

/**
 * Devuelve las estancias de compra de un usuario
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const devolverComprasDeUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params

        await Compra.find({ id_usuario }).exec()
            .then(results => {
                if (results) {
                    res.status(200).send(new ResponseAPI('ok', `Compras del usuario ${id_usuario}`, results))
                } else {
                    res.status(404).send(new ResponseAPI('not-found', `El usuario ${id_usuario} no tiene aún compras registradas`, []))
                }
            })
            .catch(error => {
                throw new Error(error)
            })
    } catch(error) {
        next(error)
    }
}

/**
 * Crea una estancia de la compra una vez el usuario ha completado la misma
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const realizarCompra = async (req, res, next) => {
    try {
        const { productos } = req.body

        // Paso 1. Actualizar el stock de los productos
        productos.forEach(async producto => {
            await Producto.findById(producto.id_producto).exec()
                .then(async product_result => {
                    if (product_result.categoria === "anillo") {                                                // Si el producto es un anillo hay que actualizar su tabla de stock, y luego también el parametro de stock general.
                        await StockAnillos.findOne({ id_producto: product_result._id }).exec()
                            .then(async stock_result => {
                                let obj_actualizacion = new Object()                                            // Segun la talla del producto creamos un objeto de actualizacion.
                                switch (producto.talla) {
                                    case '10':
                                        obj_actualizacion.talla10 = stock_result.talla10 - producto.cantidad
                                        break
                                    case '12':
                                        obj_actualizacion.talla12 = stock_result.talla12 - producto.cantidad
                                        break
                                    case '14':
                                        obj_actualizacion.talla14 = stock_result.talla14 - producto.cantidad
                                        break
                                    case '16':
                                        obj_actualizacion.talla16 = stock_result.talla16 - producto.cantidad
                                        break
                                    case '18':
                                        obj_actualizacion.talla18 = stock_result.talla18 - producto.cantidad
                                        break
                                    case '20':
                                        obj_actualizacion.talla20 = stock_result.talla20 - producto.cantidad
                                        break
                                    case '22':
                                        obj_actualizacion.talla22 = stock_result.talla22 - producto.cantidad
                                        break
                                    case '24':
                                        obj_actualizacion.talla24 = stock_result.talla24 - producto.cantidad
                                        break
                                    default:
                                        throw new Error("Ha ocurrido un problema con la talla al actualizar el stock")
                                }

                                // Actualizamos el stock del anillo.
                                await StockAnillos.findByIdAndUpdate(stock_result._id, obj_actualizacion, { returnDocument: 'after' }).exec()
                                    .then(results => console.log(results))
                                    .catch(error => console.log(error))
                            })
                    }

                    // Actualizamos el parametro de stock de cada estancia Producto.
                    await Producto.findByIdAndUpdate(product_result._id, { stock: (product_result.stock - producto.cantidad) }, { returnDocument: 'after' }).exec()
                        .then(results => console.log(results))
                        .catch(error => console.log(error))
                })
        })

        // Paso 2. Registrar la compra
        const compra = new Compra({ ...req.body })
        
        await compra.save()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok', 'Compra realizada correctamente', results))
            })
            .catch(error => { throw new Error(error) })
    } catch(error) {
        next(error)
    }
}

/**
 * Añade un nuevo producto al array de productos de una compra
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
/*export const incluirNuevoProductoEnCompra = async (req, res, next) => {
    try {
        const { _id } = req.params
        const { nuevo_producto } = req.body

        await Compra.findById(_id).exec()
            .then(async compra => {
                const productos = compra.productos
                productos.push(nuevo_producto)
                await Compra.findByIdAndUpdate(_id, { productos }, { returnDocument: 'after' })
                    .then(results => {
                        res.status(200).send(new ResponseAPI('ok', 'Producto añadido a la compra correctamente', results))
                    })
                    .catch(error => {
                        throw new Error(error)
                    })
            })
            .catch(error => {
                throw new Error(error)
            })
    } catch(error) {
        next(error)
    }
}*/

/**
 * Retira un producto del array de productos de una compra
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
/*export const retirarProductoDeCompra = async (req, res, next) => {
    try {
        const { _id } = req.params
        const { nuevo_producto } = req.body

        await Compra.findById(_id).exec()
            .then(async compra => {
                const productos = compra.productos
                const posicion_a_eliminar = productos.findIndex(p => p === nuevo_producto)

                if (posicion_a_eliminar != -1) {
                    productos.splice(posicion_a_eliminar, 1)

                    await Compra.findByIdAndUpdate(_id, { productos }, { returnDocument: 'after' })
                    .then(results => {
                        res.status(200).send(new ResponseAPI('ok', 'Producto eliminado de la compra correctamente', results))
                    })
                    .catch(error => {
                        throw new Error(error)
                    })
                } else {
                    throw new Error(error)
                }
            })
            .catch(error => {
                throw new Error("No existe el ID del producto en la compra")
            })
    } catch(error) {
        next(error)
    }
}*/

/**
 * Completa una compra después que el cliente pague
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
/*export const completarCompra = async (req, res, next) => {
    try {
        const { _id } = req.params

        await Compra.findByIdAndUpdate(_id, { pagada: Date.now() }, { returnDocument: 'after' }).exec()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok', 'Compra completada correctamente', results))
            })
            .catch(error => {
                throw new Error(error)
            })
    } catch(error) {
        next(error)
    }
}*/

/**
 * Eliminar una compra cuando el carrito se quede vacío sin haber completado la compra el cliente 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
/*
export const eliminarCompra = async (req, res, next) => {
    try {
        const { _id } = req.params

        await Compra.findByIdAndDelete(_id).exec()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok', 'Compra eliminada correctamente', results))
            })
            .catch(error => {
                throw new Error(error)
            })
    } catch(error) {
        next(error)
    }
}
*/