import mongoose, { Schema } from "mongoose"

const productoSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        default: null
    },
    precio: {
        type: Number,
        required: true
    },
    descuento: {
        type: Number,
        default: 0
    },
    imagen: {
        type: String,
        default: null
    },
    categoria: {
        type: String,
        enum: ["collar", "pulsera", "anillo"],
        required: true
    },
    stock: {
        type: Number,
        default: 1
    }
})

export const Producto = mongoose.model("Producto", productoSchema) 