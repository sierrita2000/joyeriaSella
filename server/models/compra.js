import mongoose, { Schema } from "mongoose"

const compraSchema = new Schema({
    id_usuario: {
        type: mongoose.ObjectId,
        default: null
    },
    correo: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    domicilio: {
        type: String,
        required: true
    },
    productos: Array,
    n_tarjeta: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

export const Compra = mongoose.model("Compra", compraSchema)