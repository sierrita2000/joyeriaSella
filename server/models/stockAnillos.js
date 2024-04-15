import mongoose, { Schema } from "mongoose"

const stockAnillosSchema = new Schema({
    id_producto: {
        type: mongoose.ObjectId,
        required: true,
        unique: true
    },
    talla10: {
        type: Number,
        default: 0
    },
    talla12: {
        type: Number,
        default: 0
    },
    talla14: {
        type: Number,
        default: 0
    },
    talla16: {
        type: Number,
        default: 0
    },
    talla18: {
        type: Number,
        default: 0
    },
    talla20: {
        type: Number,
        default: 0
    },
    talla22: {
        type: Number,
        default: 0
    },
    talla24: {
        type: Number,
        default: 0
    }
})

export const StockAnillos = mongoose.model('StockAnillos', stockAnillosSchema)