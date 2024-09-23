const logoutController = require('../controllers/logout.contoller')
const authValid = require("./valid/auth.valid");
const router = require('express').Router();

router.all('/logout', authValid.isValid, logoutController.logout);
module.exports = router;