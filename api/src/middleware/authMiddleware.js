const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return next(
            new AppError(401, 'UNAUTHORIZED', 'Token no proporcionado')
        );
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );

        req.user = {
            id: decoded.sub,
            rol: decoded.rol
        };

        next();
    } catch (error) {
        return next(
            new AppError(401, 'INVALID_TOKEN', 'Token inválido o caducado')
        );
    }
};

module.exports = authMiddleware;