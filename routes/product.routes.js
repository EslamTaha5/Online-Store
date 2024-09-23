const router = require('express').Router();
const bodyParser = require('body-parser');

const productController = require('../controllers/product.controller')

router.get('/:id', productController.getProduct)
module.exports = router;