const bcrypt = require('bcrypt');
const User = require('../models/usuario');
const AppError = require('../utils/AppError');
const { pick, listar } = require('../utils/helpers');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 12;
const CAMPOS_MODIFICABLES = ['nombre', 'email', 'password'];

const validarPassword = (password) => {
    let problema = null;
    if (typeof password !== 'string' || password.length < 12) {
        problema = 'La contraseña debe tener al menos 12 caracteres';
    } else if (Buffer.byteLength(password) > 72) {   // límite de bcrypt
        problema = 'La contraseña no puede superar los 72 bytes';
    }
    if (problema) {
        throw new AppError(422, 'VALIDATION_ERROR', 'Los datos no son válidos', [
            { field: 'password', message: problema }
        ]);
    }
};

const createUser = async (data) => {
    validarPassword(data.password);
    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

    // Solo se leen nombre y email del body. El rol lo fija el servidor.
    const user = new User({
        nombre: data.nombre,
        email: data.email,
        passwordHash,
        rol: 'cliente'
    });
    return await user.save();
};

const getUsers = async (query) => {
    return await listar(User, query, { sortPermitidos: ['nombre', 'email', 'createdAt'] });
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const updateUser = async (id, data) => {
    // Lista explícita: cualquier otro campo (rol, passwordHash, activo...) se rechaza
    const noPermitidos = Object.keys(data).filter((c) => !CAMPOS_MODIFICABLES.includes(c));
    if (noPermitidos.length > 0) {
        throw new AppError(400, 'CAMPOS_NO_PERMITIDOS', 'Se han enviado campos no modificables',
            noPermitidos.map((campo) => ({ field: campo, message: 'Campo no modificable' })));
    }

    const cambios = pick(data, ['nombre', 'email']);
    if (data.password !== undefined) {
        validarPassword(data.password);
        cambios.passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
    }
    if (Object.keys(cambios).length === 0) {
        throw new AppError(400, 'SIN_CAMBIOS', 'No se ha enviado ningún campo para modificar');
    }

    return await User.findByIdAndUpdate(id, cambios, { new: true, runValidators: true });
};

// Baja lógica: no se borra el documento, solo se desactiva
const deactivateUser = async (id) => {
    return await User.findByIdAndUpdate(id, { activo: false }, { new: true });
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({
        email: email.toLowerCase().trim()
    }).select('+passwordHash');

    if (!user || !user.activo) {
        throw new AppError(
            401,
            'CREDENCIALES_INCORRECTAS',
            'Email o contraseña incorrectos'
        );
    }

    const passwordCorrecta = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordCorrecta) {
        throw new AppError(
            401,
            'CREDENCIALES_INCORRECTAS',
            'Email o contraseña incorrectos'
        );
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('Falta configurar JWT_SECRET en el archivo .env');
    }

    const token = jwt.sign(
        {
            sub: user._id.toString(),
            rol: user.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );

    return {
        user,
        token
    };
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deactivateUser,
    loginUser
};