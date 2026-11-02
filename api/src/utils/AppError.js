// Error propio: lleva el código HTTP, un código interno y detalles opcionales
class AppError extends Error {
    constructor(status, code, message, details) {
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
    }
}

module.exports = AppError;