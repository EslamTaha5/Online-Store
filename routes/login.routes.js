const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;
const loginControl = require("../controllers/login.controller");
const authValid = require("./valid/auth.valid");

router.get('/login',authValid.inValid, loginControl.getlogin);
router.post('/login', authValid.inValid, bodyParser.urlencoded({extended:true}),
    check('email').not().isEmpty().withMessage('email is require'),
    check('password').not().isEmpty().withMessage('password is require'),
    loginControl.postlogin);

module.exports = router;