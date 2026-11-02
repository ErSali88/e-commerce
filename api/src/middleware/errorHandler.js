const AppError = require('../utils/AppError');

// Rutas que no existen
const notFound = (req, res, next) => {
    next(new AppError(404, 'NOT_FOUND', `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
};

// Middleware global: siempre responde con el mismo formato
const errorHandler = (err, req, res, next) => {
    let status = 500;
    let code = 'INTERNAL_ERROR';
    let message = 'Error interno del servidor';
    let details;

    if (err instanceof AppError) {
        status = err.status;
        code = err.code;
        message = err.message;
        details = err.details;
    } else if (err.name === 'ValidationError') {          // validaciones de Mongoose
        status = 422;
        code = 'VALIDATION_ERROR';
        message = 'Los datos no son válidos';
        details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
    } else if (err.name === 'CastError') {                // ID con formato incorrecto
        status = 400;
        code = 'INVALID_ID';
        message = 'El identificador no tiene un formato válido';
        details = [{ field: err.path, message: 'Formato incorrecto' }];
    } else if (err.code === 11000) {                      // índice unique (email, slug)
        status = 409;
        code = 'DUPLICATE_KEY';
        message = 'Ya existe un registro con ese valor';
        details = Object.keys(err.keyPattern || {}).map((campo) => ({
            field: campo,
            message: 'Valor duplicado'
        }));
    } else if (err.type === 'entity.parse.failed') {      // JSON mal escrito
        status = 400;
        code = 'INVALID_JSON';
        message = 'El cuerpo de la petición no es un JSON válido';
    } else {
        console.error(err);                               // el detalle solo va al log, nunca al cliente
    }

    const error = { code, message };
    if (details) error.details = details;
    res.status(status).json({ success: false, error });
};

module.exports = { notFound, errorHandler };