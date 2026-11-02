const AppError = require('./AppError');

const LIMITE_MAXIMO = 50;

// Devuelve solo los campos permitidos de un objeto
const pick = (objeto, campos) =>
    campos.reduce((resultado, campo) => {
        if (objeto[campo] !== undefined) resultado[campo] = objeto[campo];
        return resultado;
    }, {});

const enteroPositivo = (valor, campo, porDefecto) => {
    if (valor === undefined) return porDefecto;
    const numero = Number(valor);
    if (!Number.isInteger(numero) || numero < 1) {
        throw new AppError(400, 'PARAMETRO_INVALIDO', `El parámetro ${campo} no es válido`, [
            { field: campo, message: 'Debe ser un entero positivo' }
        ]);
    }
    return numero;
};

// Evita que el texto del filtro se interprete como expresión regular
const escaparRegex = (texto) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Listado genérico con filtros (activo, nombre), ordenación y paginación
const listar = async (Modelo, query, { sortPermitidos }) => {
    const filtro = {};

    if (query.activo !== undefined) {
        if (!['true', 'false'].includes(query.activo)) {
            throw new AppError(400, 'PARAMETRO_INVALIDO', 'El parámetro activo no es válido', [
                { field: 'activo', message: 'Debe ser true o false' }
            ]);
        }
        filtro.activo = query.activo === 'true';
    }

    if (query.nombre) {
        filtro.nombre = { $regex: escaparRegex(String(query.nombre)), $options: 'i' };
    }

    // sort=nombre (ascendente) o sort=-createdAt (descendente)
    const sort = query.sort ? String(query.sort) : '-createdAt';
    const campoSort = sort.startsWith('-') ? sort.slice(1) : sort;
    if (!sortPermitidos.includes(campoSort)) {
        throw new AppError(400, 'PARAMETRO_INVALIDO', 'Campo de ordenación no permitido', [
            { field: 'sort', message: `Valores permitidos: ${sortPermitidos.join(', ')}` }
        ]);
    }

    const page = enteroPositivo(query.page, 'page', 1);
    const limit = Math.min(enteroPositivo(query.limit, 'limit', 10), LIMITE_MAXIMO);

    const total = await Modelo.countDocuments(filtro);
    const data = await Modelo.find(filtro)
        .sort(sort.startsWith('-') ? { [campoSort]: -1 } : { [campoSort]: 1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        data,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    };
};

module.exports = { pick, listar };