const router = require('express').Router();
const auth = require('./valid/auth.valid')
const bodyParser = require('body-parser');
const ordersController = require('../controllers/orders.controller')

router.get('/', auth.isValid, ordersController.getOrders)


router.post('/', auth.isValid, bodyParser.urlencoded({ extended: true }), ordersController.addOrder);

router.post('/cancel', auth.isValid, bodyParser.urlencoded({ extended: true }), ordersController.deleteOrder);


module.exports = router;