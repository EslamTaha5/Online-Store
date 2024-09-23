const router = require('express').Router();
const check = require('express-validator').check;
const auth = require('./valid/auth.valid');
const cartController = require('../controllers/cart.controller');
const bodyParser = require('body-parser');

router.get('/', auth.isValid,cartController.getCart)
router.post('/', auth.isValid, bodyParser.urlencoded({ extended: true }),
    check('amount').not().isEmpty().withMessage('amount is required').isInt({ min: 1 }).withMessage('amount must be greater than 0'), cartController.postCart
)

router.post('/save', auth.isValid, bodyParser.urlencoded({ extended: true }),
    check('amount').not().isEmpty().withMessage('amount is required').isInt({ min: 1 })
    .withMessage('amount must be greater than 0'), cartController.saveCart
)

router.post('/delete', auth.isValid, bodyParser.urlencoded({ extended: true }),
    cartController.deleteCart
)

router.post('/verifyorder', auth.isValid, bodyParser.urlencoded({ extended: true }),cartController.verifyorder)
module.exports = router;