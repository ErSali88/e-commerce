
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = require('../../models/usuario');
const Token = require('../../models/Tokens');
const AppError = require('../../utils/AppError');

const ACCESS_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';
const REFRESH_DAYS = 7;

// Generar un hash SHA-256 del refresh token
const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

// Generar el access token
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            sub: user._id.toString(),
            rol: user.rol
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: ACCESS_EXPIRES_IN }
    );
};

// Generar y guardar un refresh token
const generateRefreshToken = async (userId, familyId) => {
    const tokenId = crypto.randomUUID();

    const refreshToken = jwt.sign(
        {
            sub: userId.toString(),
            jti: tokenId,
            familyId
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: REFRESH_EXPIRES_IN }
    );

    const expiresAt = new Date(
        Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000
    );

    await Token.create({
        usuario: userId,
        tokenHash: hashToken(refreshToken),
        familyId,
        expiresAt
    });

    return refreshToken;
};

// Iniciar sesión
const login = async (email, password) => {
    const user = await User.findOne({
        email: email?.toLowerCase().trim(),
        activo: true
    }).select('+passwordHash');

    if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
        throw new AppError(401, 'CREDENCIALES_INVALIDAS', 'Email o contraseña incorrectos');
    }

    const accessToken = generateAccessToken(user);
    const familyId = crypto.randomUUID();
    const refreshToken = await generateRefreshToken(user._id, familyId);

    return {
        accessToken,
        refreshToken
    };
};

// Renovar los tokens
const refresh = async (refreshToken) => {
    if (!refreshToken) {
        throw new AppError(401, 'REFRESH_TOKEN_REQUIRED', 'Falta el refresh token');
    }

    let decoded;

    try {
        decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        throw new AppError(401, 'REFRESH_TOKEN_INVALID', 'Refresh token inválido o caducado');
    }

    const tokenHash = hashToken(refreshToken);

    const storedToken = await Token.findOne({ tokenHash });

    // El token ya no existe: posible reutilización
    if (!storedToken) {
        await Token.updateMany(
            { familyId: decoded.familyId, revokedAt: null },
            { revokedAt: new Date() }
        );

        throw new AppError(401, 'TOKEN_REUTILIZADO', 'Se ha detectado un intento de reutilización');
    }

    // El token ya se había utilizado anteriormente
    if (storedToken.revokedAt) {
        await Token.updateMany(
            { familyId: storedToken.familyId, revokedAt: null },
            { revokedAt: new Date() }
        );

        throw new AppError(401, 'TOKEN_REUTILIZADO', 'Se ha detectado un intento de reutilización');
    }

    // Comprobar que el usuario sigue activo
    const user = await User.findOne({
        _id: storedToken.usuario,
        activo: true
    });

    if (!user) {
        await Token.updateMany(
            { familyId: storedToken.familyId, revokedAt: null },
            { revokedAt: new Date() }
        );

        throw new AppError(401, 'USUARIO_NO_ACTIVO', 'El usuario no está activo');
    }

    // Invalidar el token anterior de forma atómica
    const revokedToken = await Token.findOneAndUpdate(
        { _id: storedToken._id, revokedAt: null },
        { revokedAt: new Date() },
        { new: true }
    );

    // Si otra petición ya lo ha utilizado, se considera reutilización
    if (!revokedToken) {
        await Token.updateMany(
            { familyId: storedToken.familyId, revokedAt: null },
            { revokedAt: new Date() }
        );

        throw new AppError(401, 'TOKEN_REUTILIZADO', 'Se ha detectado un intento de reutilización');
    }

    const newRefreshToken = await generateRefreshToken(
        user._id,
        storedToken.familyId
    );

    // Relacionar el token antiguo con el nuevo
    await Token.findByIdAndUpdate(storedToken._id, {
        replacedBy: hashToken(newRefreshToken)
    });

    const accessToken = generateAccessToken(user);

    return {
        accessToken,
        refreshToken: newRefreshToken
    };
};

// Cerrar sesión
const logout = async (refreshToken) => {
    if (!refreshToken) {
        throw new AppError(400, 'REFRESH_TOKEN_REQUIRED', 'Falta el refresh token');
    }

    let decoded;

    try {
        decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        throw new AppError(401, 'REFRESH_TOKEN_INVALID', 'Refresh token inválido o caducado');
    }

    await Token.updateOne(
        {
            tokenHash: hashToken(refreshToken),
            familyId: decoded.familyId,
            revokedAt: null
        },
        {
            revokedAt: new Date()
        }
    );
};

module.exports = {
    login,
    refresh,
    logout
};
