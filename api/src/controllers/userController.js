const userService = require('../services/userService');
const AppError = require('../utils/AppError');

const noEncontrado = () => new AppError(404, 'NOT_FOUND', 'Usuario no encontrado');

const createUser = async (req, res) => {
    const user = await userService.createUser(req.body ?? {});
    res.status(201).json({ success: true, data: user });
};

const getUsers = async (req, res) => {
    const resultado = await userService.getUsers(req.query);
    res.status(200).json({ success: true, ...resultado });
};

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) throw noEncontrado();
    res.status(200).json({ success: true, data: user });
};

const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body ?? {});
    if (!user) throw noEncontrado();
    res.status(200).json({ success: true, data: user });
};

const deactivateUser = async (req, res) => {
    const user = await userService.deactivateUser(req.params.id);
    if (!user) throw noEncontrado();
    res.status(204).send();
};

const loginUser = async (req, res, next) => {
    try {
        const resultado = await userService.loginUser(req.body);

        res.status(200).json({
            ok: true,
            message: 'Login correcto',
            user: resultado.user,
            token: resultado.token
        });
    } catch (error) {
        next(error);
    }
};


module.exports = { createUser, getUsers, getUserById, updateUser, deactivateUser, loginUser};