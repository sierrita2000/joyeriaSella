import { Usuario } from "../models/usuarios.js"
import { ResponseAPI } from "../routes/index.routes.js"
import bcrypt from "bcrypt"

/**
 * Crea un usuario y lo alamacena en la BBDD
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const crearUsuario = async (req, res, next) => {
    try {
        const nombre = req.body.nombre
        const password = bcrypt.hashSync(req.body.password, 10)

        const usuario = new Usuario({ nombre, password })
        
        await usuario.save()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok',`Usuario (${nombre}) creado correctamente`, results))
            })
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}

/**
 * Valida un usuario y devuelve el usuario en caso de ser correcto
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const validarUsuario = async (req, res, next) => {
    try {
        const { nombre } = req.params
        
        await Usuario.findOne({ nombre }).exec()
            .then(results => {
                if (results) {
                    if (bcrypt.compareSync(req.params.password, results.password)) {
                        res.status(200).send(new ResponseAPI('ok', 'Usuario correcto', results))
                    } else {
                        res.status(400).send(new ResponseAPI('error', 'La contraseña es incorrecta', []))
                    }
                } else {
                    res.status(404).send(new ResponseAPI('not-found', 'El nombre del usuario es incorrecto', []))
                }
            })
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}

/**
 * Elimina un usuario
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const eliminarUsuario = async (req, res, next) => {
    try {
        const { _id } = req.params

        await Usuario.findByIdAndDelete({ _id }).exec()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok', `Usuario (${results.nombre}) eliminado correctamente`, results))
            })
            .catch(error => { throw new Error(error) })
    } catch(error) {
        next(error)
    }
}

/**
 * Devuelve un usuario por su Id
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next  
 */
export const devolverUsuarioPorId = async (req, res, next) => {
    try {
        const { _id } = req.params

        await Usuario.findById(_id).exec()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok', `Usuario encontrado`, results))
            })
            .catch(error => {
                throw new Error(error)
            })
    } catch(error) {
        next(error)
    }
}

/**
 * Actualiza los datos del usuario
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next  
 */
export const actualizarDatosDeUsuario = async (req, res, next) => {
    try {
        const { _id } = req.params

        await Usuario.findByIdAndUpdate(_id, { ...req.body }, { returnDocument: 'after' }).exec()
            .then(results => {
                res.status(200).send(new ResponseAPI('ok', 'Usuario actualizado correctamente', results))
            })
            .catch(error => { throw new Error(error) })
    } catch(error) {
        next(error)
    }
}