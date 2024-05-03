import { ResponseAPI } from "../routes/index.routes.js"


/**
 * Maneja los errores.
 * @param {Object} err 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Object} next 
 */
export const errores = async (err, req, res, next) => {
    const responseAPI = new ResponseAPI('error', 'la consulta no se pudo realizar', err.message).obj()
    res.status(500).send(responseAPI)
}