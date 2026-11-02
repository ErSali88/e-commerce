const Category = require('../models/categoria');
const { pick, listar } = require('../utils/helpers');

const CAMPOS = ['nombre', 'slug', 'descripcion', 'activo'];

const createCategory = async (data) => {
    const category = new Category(pick(data, CAMPOS));
    return await category.save();
};

const getCategories = async (query) => {
    return await listar(Category, query, { sortPermitidos: ['nombre', 'slug', 'createdAt'] });
};

const getCategoryById = async (id) => {
    return await Category.findById(id);
};

const updateCategory = async (id, data) => {
    return await Category.findByIdAndUpdate(id, pick(data, CAMPOS), {
        new: true,
        runValidators: true     // sin esto, el update no ejecuta las validaciones
    });
};

const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };