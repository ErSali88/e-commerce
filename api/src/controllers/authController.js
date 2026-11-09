const tokenService = require('../services/token/tokenService');

const login = async (req, res) => {
    const { email, password } = req.body ?? {};

    const tokens = await tokenService.login(email, password);

    res.status(200).json({
        success: true,
        data: tokens
    });
};

const refresh = async (req, res) => {
    const { refreshToken } = req.body ?? {};

    const tokens = await tokenService.refresh(refreshToken);

    res.status(200).json({
        success: true,
        data: tokens
    });
};

const logout = async (req, res) => {
    const { refreshToken } = req.body ?? {};

    await tokenService.logout(refreshToken);

    res.status(200).json({
        success: true,
        message: 'Sesión cerrada correctamente'
    });
};

const profile = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Acceso autorizado',
        user: req.user
    });
};

module.exports = {
    login,
    refresh,
    logout,
    profile
};