const categoryService = require('../services/categoryService');
const AppError = require('../utils/AppError');

const noEncontrada = () => new AppError(404, 'NOT_FOUND', 'Categoría no encontrada');

const createCategory = async (req, res) => {
    const category = await categoryService.createCategory(req.body ?? {});
    res.status(201).json({ success: true, data: category });
};

const getCategories = async (req, res) => {
    const resultado = await categoryService.getCategories(req.query);
    res.status(200).json({ success: true, ...resultado });
};

const getCategoryById = async (req, res) => {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) throw noEncontrada();
    res.status(200).json({ success: true, data: category });
};

const updateCategory = async (req, res) => {
    const category = await categoryService.updateCategory(req.params.id, req.body ?? {});
    if (!category) throw noEncontrada();
    res.status(200).json({ success: true, data: category });
};

const deleteCategory = async (req, res) => {
    const category = await categoryService.deleteCategory(req.params.id);
    if (!category) throw noEncontrada();
    res.status(204).send();
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };