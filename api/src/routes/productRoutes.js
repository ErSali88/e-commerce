
const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;


/* 

      Método	            Ruta	                 Acción
        GET	            /api/products	        Consultar todos los productos
        GET	            /api/products/:id	    Consultar uno
        POST	        /api/products	        Crear producto
        PUT	            /api/products/:id	    Modificar producto
        DELETE	        /api/products/:id	    Eliminar producto

*/