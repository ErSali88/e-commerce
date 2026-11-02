const productService = require('../services/productService');
const AppError = require('../utils/AppError');

const noEncontrado = () => new AppError(404, 'NOT_FOUND', 'Producto no encontrado');

const createProduct = async (req, res) => {
    const product = await productService.createProduct(req.body ?? {});
    res.status(201).json({ success: true, data: product });
};

const getProducts = async (req, res) => {
    const products = await productService.getProducts();
    res.status(200).json({ success: true, data: products });
};

const getProductById = async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    if (!product) throw noEncontrado();
    res.status(200).json({ success: true, data: product });
};

const updateProduct = async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body ?? {});
    if (!product) throw noEncontrado();
    res.status(200).json({ success: true, data: product });
};

const deleteProduct = async (req, res) => {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) throw noEncontrado();
    res.status(204).send();
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };