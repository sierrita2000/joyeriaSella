import { DatosPago } from "../models/datosPago.js"
import { ResponseAPI } from "../routes/index.routes.js"

/**
 * Crea una estancia de datos de pago
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const crearDatosDePago = async (req, res, next) => {
    try {

        const datos_pago = new DatosPago({ ...req.body })

        await datos_pago.save()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok', 'Tarjeta creada correctamente', results))
            })
            .catch(error => {
                throw new Error(error)
            })
    } catch (error) {
        next(error)
    }
}

/**
 * Devuelve una estancia de datos de pago
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const devolverDatosDePago = async (req, res, next) => {
    try {
        const { _id } = req.params

        await DatosPago.findById(_id).exec()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok', 'Datos de la tarjeta', results))
            })
            .catch(error => {
                throw new Error(error)
            })
    } catch (error) {
        next(error)
    }
}

/**
 * Devuelve los datos de pago de un usuario
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const datosDePagoDeUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params

        await DatosPago.findOne({ id_usuario }).exec()
            .then(results => {
                if (results) {
                    res.status(200).send(new ResponseAPI('ok', 'Datos de la tarjeta', results))
                } else {
                    res.status(404).send(new ResponseAPI('not-found', 'No hay datos de pago asociados a este usuario', null))
                }
            })
            .catch(error => {
                throw new Error(error)
            })
    } catch (error) {
        next(error)
    }
}

/**
 * Actualiza los datos de pago de un usuario
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const actualizarDatosDePago = async (req, res, next) => {
    try {
        const { id_usuario } = req.params

        await DatosPago.findOneAndUpdate({ id_usuario }, { ...req.body }, { returnDocument: "after" }).exec()
            .then(results => {
                    res.status(200).send(new ResponseAPI('ok', 'Datos de la tarjeta actualizados', results))
            })
            .catch(error => {
                throw new Error(error)
            })
    } catch (error) {
        next(error)
    }
}