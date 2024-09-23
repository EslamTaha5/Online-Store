const router = require('express').Router();
const bodyParser = require('body-parser');
const chck = require('express-validator').check;
const authAdmin = require('./valid/admin.valid');
const adminController = require('../controllers/admin.controller');
const multer =  require('multer');

router.get('/add', authAdmin.isAuthAdmin, adminController.Add);
router.get('/orders',authAdmin.isAuthAdmin, adminController.getOrders);
router.get('/orders/save', authAdmin.isAuthAdmin,  bodyParser.urlencoded({ extended: true }),adminController.saveOrder);
router.get('/products', authAdmin.isAuthAdmin, adminController.getProducts);
router.post('/add', authAdmin.isAuthAdmin,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "images");
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname);
            }
        })
    }).single('image'), 
    chck('image').custom((values, { req }) => {
       console.log(`from routes ${JSON.stringify(req.file)}`);
        if (req.file) return true;
        throw 'image is required';
    }), adminController.postAdd
);


router.post('/product/delete',authAdmin.isAuthAdmin,bodyParser.urlencoded({ extended: true }), adminController.deleteProduct);


module.exports = router;