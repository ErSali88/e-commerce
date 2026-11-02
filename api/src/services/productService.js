
const Product = require('../models/producto');

const createProduct = async (productData) => {
    const newProduct = new Product(productData);
    return await newProduct.save();
};

const getProducts = async () => {
    return await Product.find();
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const updateProduct = async (id, productData) => {
    return await Product.findByIdAndUpdate(
        id,
        productData,
        {
            new: true,
            runValidators: true
        }
    );
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};

/* 

        Función	            Qué hace
    createProduct	    Crea un producto.
    getProducts	        Devuelve todos los productos.
    getProductById	    Busca un producto por su ID.
    updateProduct	    Modifica un producto.
    deleteProduct	    Elimina un producto.

*/