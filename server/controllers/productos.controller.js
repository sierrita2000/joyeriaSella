import { productos, anillos } from "../carga_inicial_de_datos/productos_iniciales.js"
import { Producto } from "../models/productos.js"
import { StockAnillos } from "../models/stockAnillos.js"
import { ResponseAPI } from "../routes/index.routes.js"

/**
 * Crea una estancia de producto
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const crearProducto = async (req, res, next) => {
    try {
        let producto = null
        const tallas = req.body.tallas || new Array(8).fill(0)

        if (req.body.categoria === "anillo") {
            const stock = sumarStockTallas(tallas)
            producto = new Producto({ 
                titulo: req.body.titulo || null,
                descripcion: req.body.descripcion|| null,
                precio: req.body.precio|| null,
                descuento: req.body.descuento|| null,
                imagen: req.body.imagen|| null,
                categoria: req.body.categoria|| null,
                stock: stock, 
            })

            await producto.save()
                .then(async (resultsProducto) => {
                    const stock_anillo = new StockAnillos({
                        id_producto: resultsProducto._id,
                        talla10: tallas[0],
                        talla12: tallas[1],
                        talla14: tallas[2],
                        talla16: tallas[3],
                        talla18: tallas[4],
                        talla20: tallas[5],
                        talla22: tallas[6],
                        talla24: tallas[7]
                    })

                    await stock_anillo.save()
                        .then(() => {
                            res.status(200).send(new ResponseAPI('ok', `Producto (${req.body.titulo}) creado correctamente`, resultsProducto))
                        })
                        .catch(error => { throw new Error(error) })
                })
                .catch(error => { throw new Error(error) })
        } else {
            producto = new Producto({ ...req.body })
            await producto.save()
                .then(results => {
                    res.status(200).send(new ResponseAPI('ok', `Producto (${req.body.titulo}) creado correctamente`, results))
                })
                .catch(error => {
                    throw new Error(error)
                })
        }
    } catch(error) {
        next(error)
    }
}

/**
 * Carga los anillos iniciales
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const cargarAnillosIniciales = async (req, res, next) => {
    anillos.forEach(async anillo => {
        try {
            let producto = null
            const tallas = anillo.tallas || new Array(8).fill(0)

            const stock = sumarStockTallas(tallas)
            producto = new Producto({ 
                titulo: anillo.titulo || null,
                descripcion: anillo.descripcion|| null,
                precio: anillo.precio|| null,
                descuento: anillo.descuento|| null,
                imagen: anillo.imagen|| null,
                categoria: anillo.categoria|| null,
                stock: stock, 
            })
    
            await producto.save()
                .then(async (resultsProducto) => {
                    const stock_anillo = new StockAnillos({
                        id_producto: resultsProducto._id,
                        talla10: tallas[0],
                        talla12: tallas[1],
                        talla14: tallas[2],
                        talla16: tallas[3],
                        talla18: tallas[4],
                        talla20: tallas[5],
                        talla22: tallas[6],
                        talla24: tallas[7]
                    })
                    await stock_anillo.save()
                })
                .catch(error => { throw new Error(error) })
        } catch(error) {
            next(error)
        }

    })
}

/**
 * Devuelve una estancia de producto
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const devolverProducto = async (req, res, next) => {
    try {
        const { _id } = req.params

        await Producto.findById(_id).exec()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok', `Producto (${results.titulo}) encontrado correctamente`, results))
            })
            .catch(error => {
                throw new Error(error)
            })
    } catch(error) {
        next(error)
    }
}

/**
 * Elimina una estancia de producto
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const eliminarProducto = async (req, res, next) => {
    try {
        const { _id } = req.params

        await Producto.findByIdAndDelete(_id).exec()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok', `Producto (${results.titulo}) eliminado correctamente`, results))
            })
            .catch(error => {
                throw new Error(error)
            })
    } catch(error) {
        next(error)
    }
}

/**
 * Actualiza una estancia de producto
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const actulizarProducto = async (req, res, next) => {
    try {
        const { _id } = req.params

        await Producto.findByIdAndUpdate(_id, { ...req.body }, { returnDocument: 'after' }).exec()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok', `Producto (${results.titulo}) actualizado correctamente`, results))
            })
            .catch(error => {
                throw new Error(error)
            })
    } catch(error) {
        next(error)
    }
}

/**
 * Devuelve todos los productos que cumplan el filtro que se le pase.
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const devolverTodosLosProductos = async (req, res, next) => {
    try {
        const { limit } = req.params || 0 // Si es 0 es como no poner límite.

        await Producto.find({ ...req.body }).limit(limit).exec()
            .then(results => {
                if (results.length > 0) {
                    res.status(200).send(new ResponseAPI('ok', 'productos enviados correctamente', results))
                } else {
                    res.status(404).send(new ResponseAPI('not-found', 'No hay productos que cumplan esos filtros', results))
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
 * Carga los productos iniciales en la DDBB
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const cargarProductosIniciales = async (req, res, next) => {
    try {
        await Producto.insertMany(productos)
            .then(results => res.status(200).send(new ResponseAPI('ok', 'Productos añadidos correctamente', results)))
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}

/**
 * Devuelve un anillo al azar para la pantalla de inicio
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const devolverAnilloRandom = async (req, res, next) => {
    try {
        await Producto.find({ categoria: "anillo" }).exec()
            .then(results => {
                const anillo = results[Math.floor(Math.random() * results.length)]
                res.status(200).send(new ResponseAPI('ok', 'Producto enviado correctamente', anillo))
            })
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}

/***************************************************************************************************/
/************************************************Funciones******************************************/
/***************************************************************************************************/

/**
 * Calcula el stock de un producto sumando todos las tallas.
 * @param {Array} tallas 
 * @returns Number
 */
const sumarStockTallas = (tallas) => {
    return tallas.reduce((acumulador, valorActual) => acumulador + valorActual, 0)
}