const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/', productController.createProduct); // Crear producto (solo admin)
router.get('/', productController.listProducts); // Listar productos (todos los usuarios)

module.exports = router;
