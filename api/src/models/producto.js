const mongoose = require('mongoose');
//http://localhost:3000/api/products

//PUT
//{
//  "precio": 799,
//  "stock": 8
//}

//{
//  "nombre": "iPhone 16",
//  "marca": "Apple",
//  "precio": 899,
//  "stock": 10,
//  "sistemaOperativo": "iOS",
//  "descripcion": "Móvil de prueba para la actividad de e-commerce"
//}

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    marca: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true,
        min: 0
    },

    stock: {
        type: Number,
        required: true,
        min: 0
    },

    sistemaOperativo: {
        type: String,
        enum: ['Android', 'iOS']
    },

    descripcion: {
        type: String
    },

    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }
});

productoSchema.index({ marca: 1 });

module.exports = mongoose.model('Producto', productoSchema);