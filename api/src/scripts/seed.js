require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Categoria = require('../models/categoria');
const Usuario = require('../models/usuario');

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const passwordHash = await bcrypt.hash('ClaveFicticia2026', 12);

    const categorias = Array.from({ length: 25 }, (_, i) => ({
        nombre: `Categoria ${i + 1}`,
        slug: `categoria-${i + 1}`,
        descripcion: `Categoría de prueba ${i + 1}`,
        activo: i % 4 !== 0
    }));

    const usuarios = Array.from({ length: 25 }, (_, i) => ({
        nombre: i % 5 === 0 ? `Anna ${i + 1}` : `Usuario ${i + 1}`,
        email: `usuario${i + 1}@ejemplo.com`,
        passwordHash,
        rol: 'cliente',
        activo: i % 6 !== 0
    }));

    await Categoria.insertMany(categorias);
    await Usuario.insertMany(usuarios);
    console.log('Datos de prueba insertados');
    await mongoose.disconnect();
};

seed().catch((e) => { console.error(e.message); process.exit(1); });