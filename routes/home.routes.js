const router = require('express').Router();
const auth = require('./valid/auth.valid');

const HomeControl = require('../controllers/home.controller');
router.get('/', HomeControl.getHome);

module.exports = router;