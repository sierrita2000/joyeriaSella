import { StockAnillos } from "../models/stockAnillos.js"
import { ResponseAPI } from "../routes/index.routes.js"

/**
 * Devuelve el stock por tallas de un anillo
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const devolverStockDeAnillo = async (req, res, next) => {
    try {
        const { id_producto } = req.params

        await StockAnillos.findOne({ id_producto }).exec()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok', 'Enviando stock de tallas', results))
            })
            .catch(error => { throw new Error(error) })
    } catch(error) {
        next(error)
    }
}