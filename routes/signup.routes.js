const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;
const signupControl = require("../controllers/signup.contoller");
const authValid = require("./valid/auth.valid");

router.get('/signup',authValid.inValid, signupControl.getSignup);
router.post('/signup', authValid.inValid, bodyParser.urlencoded({extended:true}),
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').not().isEmpty().withMessage('Email is required').isEmail().not().withMessage("Invalid email!"),
    check('password').not().isEmpty().withMessage('Password is required').isLength({min: 6}).withMessage("Invalid Password!"),
signupControl.postSignup);

module.exports = router;