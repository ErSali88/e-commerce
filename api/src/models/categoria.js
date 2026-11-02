const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    slug: {
        type: String,
        required: [true, 'El slug es obligatorio'],
        unique: true,          // unique crea un índice, no es una validación de Mongoose
        trim: true,
        lowercase: true
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: [500, 'La descripción no puede superar los 500 caracteres']
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Categoria', categoriaSchema);