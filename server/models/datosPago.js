import mongoose, { Schema } from "mongoose"

const datosPagoSchema = new Schema({
    id_usuario: {
        type: mongoose.ObjectId,
        required: true
    },
    n_tarjeta: {
        type: String,
        required: true
    },
    fecha_caducidad: {
        type: String,
        required: true
    },
    codigo_seguridad: {
        type: String,
        required: true
    }
})

export const DatosPago = mongoose.model("DatosPago", datosPagoSchema)