import mongoose, { Schema } from 'mongoose'

const usuarioSchema = new Schema ({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        default: null
    },
    ciudad: {
        type: String,
        default: null
    },
    provincia: {
        type: String,
        default: null
    },
    domicilio: {
        type: String,
        default: null
    },
    rol: {
        type: String,
        enum: ["admin", "cliente"],
        default: "cliente"
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

export const Usuario = mongoose.model("Usuario", usuarioSchema)